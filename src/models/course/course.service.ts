import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

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
}
