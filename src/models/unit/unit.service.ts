import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  BulkUpdateUnitsDto,
  BulkUpdateUnitsResponseDto,
} from 'src/models/unit/dto/bulk-update-units.dto';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
import { UnitLearnResponseDto } from 'src/models/unit/dto/unit-learn.dto';
import { UpdateUnitDto } from 'src/models/unit/dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUnitDto: CreateUnitDto,
    userId: string,
  ): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.create({
      data: {
        title: createUnitDto.title,
        orderIndex: createUnitDto.orderIndex,
        isPremium: createUnitDto.isPremium ?? false,
        courseId: createUnitDto.courseId,
        createdBy: userId,
      },
    });

    return {
      unit,
    };
  }

  async getUnit(unitId: string): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.findUnique({
      where: { id: unitId },
      include: {
        lessons: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }

    return {
      unit,
    };
  }

  async getUnitForLearning(unitId: string): Promise<UnitLearnResponseDto> {
    const unit = await this.prisma.unit.findUnique({
      where: {
        id: unitId,
      },
      include: {
        lessons: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }

    return {
      unit,
    };
  }

  async update(
    unitId: string,
    updateUnitDto: UpdateUnitDto,
  ): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.update({
      where: { id: unitId },
      data: {
        title: updateUnitDto.title,
        orderIndex: updateUnitDto.orderIndex,
        isPremium: updateUnitDto.isPremium,
      },
      include: {
        lessons: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    return { unit };
  }

  async delete(unitId: string): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.delete({
      where: { id: unitId },
    });

    return { unit };
  }

  // async bulkUpdate(
  //   data: BulkUpdateUnitsDto,
  // ): Promise<BulkUpdateUnitsResponseDto> {
  //   const { courseId, units } = data;

  //   // 1. Validate course exists
  //   const course = await this.prisma.course.findUnique({
  //     where: { id: courseId },
  //     include: {
  //       units: {
  //         include: {
  //           lessons: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!course) {
  //     throw new NotFoundException(`Course with ID ${courseId} not found`);
  //   }

  //   // 2. Create map of existing lessons
  //   const existingLessonMap = new Map(
  //     course.units.flatMap((u) => u.lessons.map((l) => [l.id, l])),
  //   );

  //   // 3. Use transaction for atomic updates
  //   const bulkUpdateResult = await this.prisma.$transaction(async (tx) => {
  //     const processedLessons = new Set<string>();

  //     // Update units
  //     for (const unit of units) {
  //       await tx.unit.update({
  //         where: { id: unit.id },
  //         data: {
  //           title: unit.title,
  //           orderIndex: unit.orderIndex,
  //           isPremium: unit.isPremium,
  //         },
  //       });

  //       // Update lessons if provided
  //       if (unit.lessons?.length > 0) {
  //         for (const lesson of unit.lessons) {
  //           if (processedLessons.has(lesson.id)) {
  //             throw new BadRequestException(
  //               `Lesson ${lesson.id} appears multiple times in update request`,
  //             );
  //           }
  //           processedLessons.add(lesson.id);

  //           const existingLesson = existingLessonMap.get(lesson.id);
  //           if (!existingLesson) {
  //             throw new BadRequestException(
  //               `Lesson ${lesson.id} not found in course ${courseId}`,
  //             );
  //           }

  //           await tx.lesson.update({
  //             where: { id: lesson.id },
  //             data: {
  //               title: lesson.title,
  //               summary: lesson.summary,
  //               orderIndex: lesson.orderIndex,
  //               isPremium: lesson.isPremium,
  //               isRequired: lesson.isRequired,
  //               status: lesson.status,
  //               lessonWeight: lesson.lessonWeight,
  //               unitId: unit.id,
  //             },
  //           });
  //         }
  //       }
  //     }

  //     // Fetch final state
  //     const finalUnits = await tx.unit.findMany({
  //       where: {
  //         id: { in: units.map((u) => u.id) },
  //       },
  //       include: {
  //         course: {
  //           select: {
  //             id: true,
  //             title: true,
  //           },
  //         },
  //         lessons: {
  //           orderBy: {
  //             orderIndex: 'asc',
  //           },
  //         },
  //       },
  //       orderBy: {
  //         orderIndex: 'asc',
  //       },
  //     });

  //     return finalUnits;
  //   });

  //   // 4. Transform and return response
  //   return {
  //     data: bulkUpdateResult.map((unit) => ({
  //       id: unit.id,
  //       title: unit.title,
  //       orderIndex: unit.orderIndex,
  //       isPremium: unit.isPremium,
  //       courseId: unit.courseId,
  //       createdBy: unit.createdBy,
  //       createdAt: unit.createdAt,
  //       updatedAt: unit.updatedAt,
  //       course: unit.course,
  //       lessons: unit.lessons.map((lesson) => ({
  //         id: lesson.id,
  //         title: lesson.title,
  //         summary: lesson.summary,
  //         orderIndex: lesson.orderIndex,
  //         isPremium: lesson.isPremium,
  //         isRequired: lesson.isRequired,
  //         status: lesson.status,
  //         lessonWeight: lesson.lessonWeight,
  //         unitId: lesson.unitId,
  //         createdBy: lesson.createdBy,
  //         createdAt: lesson.createdAt,
  //         updatedAt: lesson.updatedAt,
  //       })),
  //     })),
  //   };
  // }

  async bulkUpdate(
    data: BulkUpdateUnitsDto,
  ): Promise<BulkUpdateUnitsResponseDto> {
    const { courseId, units } = data;

    // Debug log incoming data
    console.log(
      'Bulk Update Request:',
      JSON.stringify(
        {
          courseId,
          unitIds: units.map((u) => u.id),
        },
        null,
        2,
      ),
    );

    try {
      // 1. Validate course exists
      const course = await this.prisma.course.findUnique({
        where: { id: courseId },
        include: {
          units: {
            include: {
              lessons: true,
            },
          },
        },
      });

      if (!course) {
        throw new NotFoundException(`Course with ID ${courseId} not found`);
      }

      // 2. Validate all units exist and belong to this course
      const existingUnits = new Set(course.units.map((u) => u.id));
      const invalidUnits = units.filter((u) => !existingUnits.has(u.id));

      if (invalidUnits.length > 0) {
        throw new NotFoundException(
          `Units with IDs [${invalidUnits.map((u) => u.id).join(', ')}] not found in course ${courseId}`,
        );
      }

      // 3. Create map of existing lessons
      const existingLessonMap = new Map(
        course.units.flatMap((u) => u.lessons.map((l) => [l.id, l])),
      );

      // 4. Validate all lessons exist
      const allRequestedLessons = units.flatMap((u) => u.lessons || []);
      const invalidLessons = allRequestedLessons.filter(
        (l) => !existingLessonMap.has(l.id),
      );

      if (invalidLessons.length > 0) {
        throw new NotFoundException(
          `Lessons with IDs [${invalidLessons.map((l) => l.id).join(', ')}] not found in course ${courseId}`,
        );
      }

      // 5. Use transaction for atomic updates
      return await this.prisma.$transaction(async (tx) => {
        const processedLessons = new Set<string>();

        // Update units
        for (const unit of units) {
          try {
            await tx.unit.update({
              where: { id: unit.id },
              data: {
                title: unit.title,
                orderIndex: unit.orderIndex,
                isPremium: unit.isPremium,
              },
            });
          } catch (error) {
            throw new BadRequestException(
              `Failed to update unit ${unit.id}: ${error.message}`,
            );
          }

          // Update lessons if provided
          if (unit.lessons?.length > 0) {
            for (const lesson of unit.lessons) {
              if (processedLessons.has(lesson.id)) {
                throw new BadRequestException(
                  `Lesson ${lesson.id} appears multiple times in update request`,
                );
              }
              processedLessons.add(lesson.id);

              try {
                await tx.lesson.update({
                  where: { id: lesson.id },
                  data: {
                    title: lesson.title,
                    summary: lesson.summary,
                    orderIndex: lesson.orderIndex,
                    isPremium: lesson.isPremium,
                    isRequired: lesson.isRequired,
                    status: lesson.status,
                    lessonWeight: lesson.lessonWeight,
                    unitId: unit.id,
                  },
                });
              } catch (error) {
                throw new BadRequestException(
                  `Failed to update lesson ${lesson.id} in unit ${unit.id}: ${error.message}`,
                );
              }
            }
          }
        }

        // Fetch and return final state
        const finalUnits = await tx.unit.findMany({
          where: {
            id: { in: units.map((u) => u.id) },
          },
          include: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
            lessons: {
              orderBy: {
                orderIndex: 'asc',
              },
            },
          },
          orderBy: {
            orderIndex: 'asc',
          },
        });

        return {
          data: finalUnits.map((unit) => ({
            id: unit.id,
            title: unit.title,
            orderIndex: unit.orderIndex,
            isPremium: unit.isPremium,
            courseId: unit.courseId,
            createdBy: unit.createdBy,
            createdAt: unit.createdAt,
            updatedAt: unit.updatedAt,
            course: unit.course,
            lessons: unit.lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
              summary: lesson.summary,
              orderIndex: lesson.orderIndex,
              isPremium: lesson.isPremium,
              isRequired: lesson.isRequired,
              status: lesson.status,
              lessonWeight: lesson.lessonWeight,
              unitId: lesson.unitId,
              createdBy: lesson.createdBy,
              createdAt: lesson.createdAt,
              updatedAt: lesson.updatedAt,
            })),
          })),
        };
      });
    } catch (error) {
      // Log the full error for debugging
      console.error('Bulk update error:', error);

      // Handle specific Prisma errors
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'One or more records not found. Please check if all units and lessons exist.',
        );
      }

      // Rethrow NestJS exceptions
      if (error instanceof HttpException) {
        throw error;
      }

      // Handle other errors
      throw new BadRequestException(`Failed to update units: ${error.message}`);
    }
  }
}
