import { Injectable, NotFoundException } from '@nestjs/common';

import {
  notDeletedQuery,
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';
import { CreateCourseDto } from 'src/models/course/dto/create-course.dto';
import {
  CourseListResponseDto,
  CourseUnitResponseDto,
  GetCourseUnitsRequestDto,
} from 'src/models/course/dto/get-course-units.dto';
import { GetCoursesRequestDto } from 'src/models/course/dto/get-courses.dto';
import { JoinCourseResponseDto } from 'src/models/course/dto/join-course-response.dto';
import { UpdateCourseDto } from 'src/models/course/dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCourseDto: CreateCourseDto,
    userId: string,
  ): Promise<CourseResponseDto> {
    const course = await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        description: createCourseDto.description,
        thumbnailUrl: createCourseDto.thumbnailUrl,
        language: createCourseDto.language,
        minLevel: createCourseDto.minLevel,
        maxLevel: createCourseDto.maxLevel,
        topics: createCourseDto.topics,
        courseType: createCourseDto.courseType,
        totalWeight: createCourseDto.totalWeight,
        isPublished: createCourseDto.isPublished,
        creator: {
          connect: { id: userId },
        },
      },
      include: {
        creator: true,
      },
    });

    return { course };
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    const course = await this.prisma.course.findFirst({
      where: { id, deletedAt: null },
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    const updated = await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
      include: {
        creator: true,
        units: {
          include: {
            contents: true,
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    return { course: updated };
  }

  async delete(id: string): Promise<CourseResponseDto> {
    const course = await this.prisma.course.findFirst({
      where: { id, deletedAt: null },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    const deletedCourse = await this.prisma.course.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      include: {
        creator: true,
      },
    });

    return {
      course: deletedCourse,
    };
  }

  async getAll(query: GetCoursesRequestDto): Promise<CourseListResponseDto> {
    const { search, page, perPage } = query;

    const queryOptions = {
      where: {
        ...notDeletedQuery,
        ...searchQuery(search, ['title', 'description']),
      },
      include: {
        creator: true,
        spaces: true,
      },
      orderBy: { createdAt: 'desc' },
      ...paginationQuery(page, perPage),
    };

    const [courses, totalItems] = await Promise.all([
      this.prisma.course.findMany(queryOptions),
      this.prisma.course.count({ where: queryOptions.where }),
    ]);

    return {
      data: courses.map((course) => ({
        ...course,
        _count: {
          spaces: course.spaces.length,
        },
      })),
      pagination: calculatePagination(totalItems, { page, perPage }),
    };
  }

  async getById(id: string): Promise<CourseResponseDto> {
    const course = await this.prisma.course.findFirst({
      where: {
        id,
        ...notDeletedQuery,
      },
      include: {
        creator: true,
        units: {
          include: {
            contents: true,
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return {
      course,
    };
  }

  async getCourseUnits(
    courseId: string,
    query: GetCourseUnitsRequestDto,
  ): Promise<CourseUnitResponseDto> {
    const { search, page, perPage } = query;

    const queryOptions = {
      where: {
        courseId,
        ...searchQuery(search, ['title', 'description']),
      },
      orderBy: {
        orderIndex: 'asc',
      },
      ...paginationQuery(page, perPage),
    };

    const [units, totalItems] = await Promise.all([
      this.prisma.unit.findMany(queryOptions),
      this.prisma.unit.count({ where: queryOptions.where }),
    ]);

    return {
      data: units,
      pagination: calculatePagination(totalItems, query),
    };
  }

  async joinCourse(
    courseId: string,
    spaceId: string,
  ): Promise<JoinCourseResponseDto> {
    // Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if space exists
    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${spaceId} not found`);
    }

    // Check if already joined
    const existingJoin = await this.prisma.spaceCourse.findUnique({
      where: {
        spaceId_courseId: {
          spaceId,
          courseId,
        },
      },
    });

    if (existingJoin) {
      // If already joined, remove the connection
      await this.prisma.spaceCourse.delete({
        where: {
          spaceId_courseId: {
            spaceId,
            courseId,
          },
        },
      });

      return {
        message: 'Successfully left the course',
        joinedAt: existingJoin.joinedAt,
      };
    }

    // Create new connection
    await this.prisma.spaceCourse.create({
      data: {
        spaceId,
        courseId,
        joinedAt: new Date(),
      },
    });

    return {
      message: 'Successfully joined the course',
      joinedAt: new Date(),
    };
  }
}
