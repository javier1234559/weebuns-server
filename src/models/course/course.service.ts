import { Injectable, NotFoundException } from '@nestjs/common';

import {
  notDeletedQuery,
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CourseLearnResponseDto } from 'src/models/course/dto/course-learn-response.dto';
import {
  CourseProgressResponseDto,
  UpdateCourseProgressDto,
} from 'src/models/course/dto/course-progress.dto';
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
    userId: string,
    courseId: string,
    spaceId: string,
  ): Promise<JoinCourseResponseDto> {
    const firstUnit = await this.prisma.unit.findFirst({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        contents: {
          orderBy: { orderIndex: 'asc' },
          take: 1,
          select: { id: true },
        },
      },
    });

    if (!firstUnit) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const existingProgress = await this.prisma.courseProgress.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    const existingJoin = await this.prisma.spaceCourse.findUnique({
      where: {
        spaceId_courseId: { spaceId, courseId },
      },
    });

    if (existingJoin) {
      await this.prisma.spaceCourse.delete({
        where: {
          spaceId_courseId: { spaceId, courseId },
        },
      });

      return {
        message: 'Successfully left the course',
        joinedAt: existingJoin.joinedAt,
        progress: existingProgress,
      };
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const spaceCourse = await tx.spaceCourse.create({
        data: {
          spaceId,
          courseId,
          joinedAt: new Date(),
        },
      });

      let courseProgress = existingProgress;

      if (!existingProgress) {
        courseProgress = await tx.courseProgress.create({
          data: {
            userId,
            courseId,
            currentUnitId: firstUnit.id,
            currentUnitContentId: firstUnit.contents[0]?.id,
            completedWeight: 0,
            completedUnits: [],
            completedContents: [],
            lastAccessedAt: new Date(),
          },
        });
      }

      return {
        spaceCourse,
        courseProgress,
      };
    });

    return {
      message: 'Successfully joined the course',
      joinedAt: result.spaceCourse.joinedAt,
      progress: result.courseProgress,
    };
  }

  async getLearnCourse(courseId: string): Promise<CourseLearnResponseDto> {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        isPublished: true,
        ...notDeletedQuery,
      },
      include: {
        units: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }

    return {
      course,
    };
  }

  async getCourseProgress(
    courseId: string,
    userId: string,
  ): Promise<CourseProgressResponseDto> {
    const progress = await this.prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!progress) {
      // Create initial progress structure
      const initialProgress = await this.prisma.courseProgress.create({
        data: {
          userId,
          courseId,
          completedWeight: 0,
          completedUnits: [],
          completedContents: [],
          lastAccessedAt: new Date(),
        },
      });

      return { courseProgress: initialProgress };
    }

    return { courseProgress: progress };
  }

  async updateCourseProgress(
    courseId: string,
    userId: string,
    updateProgressDto: UpdateCourseProgressDto,
  ): Promise<CourseProgressResponseDto> {
    const progress = await this.prisma.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      create: {
        userId,
        courseId,
        ...updateProgressDto,
        lastAccessedAt: new Date(),
      },
      update: {
        ...updateProgressDto,
        lastAccessedAt: new Date(),
      },
    });

    return { courseProgress: progress };
  }
}
