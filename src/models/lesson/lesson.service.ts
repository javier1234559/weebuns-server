import { Injectable, NotFoundException } from '@nestjs/common';

import { ContentStatus } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateLessonDto } from 'src/models/lesson/dto/create-lesson.dto';
import { GetLessonResponseDto } from 'src/models/lesson/dto/get-lesson-response.dto';
import { LessonResponseDto } from 'src/models/lesson/dto/lesson-response.dto';
import { UpdateLessonDto } from 'src/models/lesson/dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  async createLesson(
    unitId: string,
    createLessonDto: CreateLessonDto,
    userId: string, // Add this parameter for createdBy
  ): Promise<GetLessonResponseDto> {
    const lesson = await this.prisma.lesson.create({
      data: {
        unitId,
        title: createLessonDto.title,
        summary: createLessonDto.summary,
        content: createLessonDto.content,
        orderIndex: createLessonDto.orderIndex,
        isPremium: createLessonDto.isPremium ?? false,
        isRequired: createLessonDto.isRequired ?? true,
        lessonWeight: createLessonDto.lessonWeight ?? 0,
        status: ContentStatus.draft,
        createdBy: userId,
      },
    });

    return {
      lesson,
    };
  }

  async findOne(id: string): Promise<LessonResponseDto> {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id,
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson ${id} not found`);
    }

    return { lesson };
  }

  async findOneAndCheck(
    unitId: string,
    lessonId: string,
  ): Promise<LessonResponseDto> {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        unitId,
      },
    });

    if (!lesson) {
      throw new NotFoundException(
        `Lesson ${lessonId} not found in unit ${unitId}`,
      );
    }

    return { lesson };
  }

  async create(
    unitId: string,
    dto: CreateLessonDto,
    userId: string,
  ): Promise<LessonResponseDto> {
    const unit = await this.prisma.unit.findUnique({ where: { id: unitId } });
    if (!unit) throw new NotFoundException(`Unit ${unitId} not found`);

    const lesson = await this.prisma.lesson.create({
      data: {
        ...dto,
        unitId,
        createdBy: userId,
        status: dto.status ?? ContentStatus.draft,
        isPremium: dto.isPremium ?? false,
        isRequired: dto.isRequired ?? true,
        lessonWeight: dto.lessonWeight ?? 0,
      },
    });

    return { lesson };
  }

  async update(
    unitId: string,
    lessonId: string,
    dto: UpdateLessonDto,
  ): Promise<LessonResponseDto> {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        unitId,
      },
    });

    if (!lesson) {
      throw new NotFoundException(
        `Lesson ${lessonId} not found in unit ${unitId}`,
      );
    }

    const updated = await this.prisma.lesson.update({
      where: { id: lessonId },
      data: dto,
    });

    return { lesson: updated };
  }

  async delete(unitId: string, lessonId: string): Promise<LessonResponseDto> {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        unitId,
      },
    });

    if (!lesson) {
      throw new NotFoundException(
        `Lesson ${lessonId} not found in unit ${unitId}`,
      );
    }

    const deleted = await this.prisma.lesson.delete({
      where: { id: lessonId },
    });

    return { lesson: deleted };
  }

  async lessonLearn(
    unitId: string,
    lessonId: string,
  ): Promise<LessonResponseDto> {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        unitId,
      },
      include: {
        creator: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException(
        `Lesson ${lessonId} not found in unit ${unitId}`,
      );
    }

    return { lesson };
  }
}
