import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { LevelCode } from 'src/common/enum/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';
import { CourseDto } from 'src/models/course/dto/course.dto';
import { CreateCourseResponseDto } from 'src/models/course/dto/create-course-response.dto';
import { CreateCourseDto } from 'src/models/course/dto/create-course.dto';
import { GetCourseUnitsResponseDto } from 'src/models/course/dto/get-course-units-response.dto';
import { GetCoursesRequestDto } from 'src/models/course/dto/get-courses-request.dto';
import { GetCoursesResponseDto } from 'src/models/course/dto/get-courses-response.dto';
import { JoinCourseRequestDto } from 'src/models/course/dto/join-course-request.dto';
import { JoinCourseResponseDto } from 'src/models/course/dto/join-course-response.dto';
import { RecommendCourseRequestDto } from 'src/models/course/dto/recommend-course-request.dto';
import { RecommendCourseResponseDto } from 'src/models/course/dto/recommend-course-response.dto';
import { RecommendedCourseDto } from 'src/models/course/dto/recommended-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(
    createCourseDto: CreateCourseDto,
  ): Promise<CreateCourseResponseDto> {
    const {
      title,
      description,
      thumbnailUrl,
      level,
      price,
      totalWeight,
      isPublished,
      createdBy,
    } = createCourseDto;

    const course = await this.prisma.course.create({
      data: {
        title,
        description,
        thumbnailUrl,
        level,
        price,
        totalWeight,
        isPublished,
        creator: {
          connect: { id: createdBy },
        },
      },
    });

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      level: course.level as LevelCode,
      price: course.price,
      totalWeight: course.totalWeight,
      isPublished: course.isPublished,
      createdAt: course.createdAt,
    };
  }

  async getCourseById(
    courseId: string,
    spaceId: string,
  ): Promise<CourseResponseDto> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
        units: {
          include: {
            contents: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const isJoined = await this.prisma.spaceCourse.findUnique({
      where: {
        spaceId_courseId: {
          spaceId,
          courseId,
        },
      },
    });

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      level: course.level,
      price: course.price,
      totalWeight: course.totalWeight,
      isPublished: course.isPublished,
      createdAt: course.createdAt,
      creator: {
        id: course.creator.id,
        username: course.creator.username,
        profilePicture: course.creator.profilePicture,
      },
      units: course.units.map((unit) => ({
        id: unit.id,
        title: unit.title,
        description: unit.description,
        orderIndex: unit.orderIndex,
        contents: unit.contents.map((content) => ({
          id: content.id,
          title: content.title,
          contentType: content.contentType,
          orderIndex: content.orderIndex,
          isPremium: content.isPremium,
          isRequired: content.isRequired,
          completeWeight: content.completeWeight,
          isDone: content.isDone,
        })),
      })),
      is_joined: !!isJoined,
    };
  }

  async recommendCourses(
    recommendCourseRequestDto: RecommendCourseRequestDto,
  ): Promise<RecommendCourseResponseDto> {
    const { spaceId } = recommendCourseRequestDto;

    // Lấy thông tin target và level của space hiện tại
    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
      select: {
        target: true,
        currentLevel: true,
      },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${spaceId} not found`);
    }

    const { target, currentLevel } = space;

    // Lấy top 5 khóa học phù hợp dựa vào target và level của space hiện tại
    const courses = await this.prisma.$queryRaw<RecommendedCourseDto[]>`
      SELECT
        c.id,
        c.title,
        c.description,
        c.thumbnail_url AS "thumbnailUrl",
        c.level,
        c.price,
        c.total_weight AS "totalWeight",
        c.is_published AS "isPublished",
        c.created_at AS "createdAt",
        u.id AS "creator.id",
        u.username AS "creator.username",
        u.profile_picture AS "creator.profilePicture",
        sc.joined_at AS "joinedAt",
        CASE WHEN sc.course_id IS NOT NULL THEN true ELSE false END AS "is_joined",
        (CASE
          WHEN c.target = ${target} AND c.level = ${currentLevel} THEN 100
          WHEN c.target = ${target} THEN 75
          WHEN c.level = ${currentLevel} THEN 50
          ELSE 25
        END) AS "matching_score"
      FROM courses c
      LEFT JOIN space_courses sc ON c.id = sc.course_id AND sc.space_id = ${spaceId}
      LEFT JOIN users u ON c.created_by = u.id
      WHERE c.is_published = true
      ORDER BY "matching_score" DESC, c.created_at DESC
      LIMIT 5
    `;

    return {
      data: courses.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        level: course.level,
        price: course.price,
        totalWeight: course.totalWeight,
        isPublished: course.isPublished,
        createdAt: course.createdAt,
        creator: {
          id: course.creator.id,
          username: course.creator.username,
          profilePicture: course.creator.profilePicture,
        },
        is_joined: course.is_joined,
        matching_score: course.matching_score,
      })),
    };
  }

  async getCourses(
    getCoursesRequestDto: GetCoursesRequestDto,
  ): Promise<GetCoursesResponseDto> {
    const {
      search = '',
      page = 1,
      perPage = 10,
      spaceId,
    } = getCoursesRequestDto;
    const skip = (page - 1) * perPage;

    try {
      // Lấy tổng số khóa học phù hợp
      const total = await this.prisma.course.count({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        },
      });

      // Lấy danh sách khóa học phù hợp
      const courses = await this.prisma.$queryRaw<CourseDto[]>`
        SELECT
          c.id,
          c.title,
          c.description,
          c.thumbnail_url AS "thumbnailUrl",
          c.level,
          c.price,
          c.total_weight AS "totalWeight",
          c.is_published AS "isPublished",
          u.id AS "creatorId",
          u.username,
          u.profile_picture AS "profilePicture",
          sc.joined_at AS "joinedAt",
          CASE WHEN sc.course_id IS NOT NULL THEN true ELSE false END AS "is_joined"
        FROM courses c
        LEFT JOIN space_courses sc ON c.id = sc.course_id AND sc.space_id = ${spaceId}
        LEFT JOIN users u ON c.created_by = u.id
        WHERE c.is_published = true
          AND (c.title ILIKE ${'%' + search + '%'} OR c.description ILIKE ${'%' + search + '%'})
        ORDER BY c.created_at DESC
        LIMIT ${perPage} OFFSET ${skip}
      `;

      const totalPages = Math.ceil(total / perPage);

      return {
        data: courses.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnailUrl: course.thumbnailUrl,
          level: course.level as LevelCode,
          price: course.price,
          totalWeight: course.totalWeight,
          isPublished: course.isPublished,
          creator: {
            id: course.creator.id,
            username: course.creator.username,
            profilePicture: course.creator.profilePicture,
          },
          is_joined: course.is_joined,
        })),
        pagination: {
          total,
          page,
          perPage,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error in getCourses:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async joinCourse(
    courseId: string,
    joinCourseRequestDto: JoinCourseRequestDto,
  ): Promise<JoinCourseResponseDto> {
    const { spaceId } = joinCourseRequestDto;

    // Check course có isPublished = true
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: {
        isPublished: true,
        price: true,
      },
    });

    if (!course || !course.isPublished) {
      throw new NotFoundException(
        `Course with ID ${courseId} not found or not published`,
      );
    }

    // Check chưa tồn tại trong bảng SpaceCourse
    const existingSpaceCourse = await this.prisma.spaceCourse.findUnique({
      where: {
        spaceId_courseId: {
          spaceId,
          courseId,
        },
      },
    });

    if (existingSpaceCourse) {
      throw new BadRequestException(
        `Course with ID ${courseId} is already joined in space with ID ${spaceId}`,
      );
    }

    // Nếu course có price != null thì check trong bảng UserCourse có payment_status = 'completed'
    if (course.price !== null) {
      const userCourse = await this.prisma.userCourse.findFirst({
        where: {
          courseId,
          paymentStatus: 'completed',
        },
      });

      if (!userCourse) {
        throw new BadRequestException(
          `Payment for course with ID ${courseId} is not completed`,
        );
      }
    }

    // Tạo record mới trong SpaceCourse với joinedAt = now()
    const spaceCourse = await this.prisma.spaceCourse.create({
      data: {
        spaceId,
        courseId,
        joinedAt: new Date(),
      },
    });

    return {
      message: `Successfully joined course with ID ${courseId} in space with ID ${spaceId}`,
      joinedAt: spaceCourse.joinedAt,
    };
  }

  async getCourseUnits(courseId: string): Promise<GetCourseUnitsResponseDto> {
    try {
      // Kiểm tra xem khóa học có tồn tại không
      const course = await this.prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        throw new NotFoundException(`Course with ID ${courseId} not found`);
      }

      // Lấy danh sách units của khóa học theo thứ tự orderIndex
      const units = await this.prisma.unit.findMany({
        where: { courseId },
        orderBy: { orderIndex: 'asc' },
        select: {
          id: true,
          courseId: true,
          title: true,
          description: true,
          orderIndex: true,
          comments: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        data: units.map((unit) => ({
          id: unit.id,
          courseId: unit.courseId,
          title: unit.title,
          description: unit.description,
          orderIndex: unit.orderIndex,
          comments: unit.comments.map((comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
            updatedAt: comment.updatedAt.toISOString(),
          })),
          createdAt: unit.createdAt,
          updatedAt: unit.updatedAt,
        })),
      };
    } catch (error) {
      console.error('Error in getCourseUnits:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
