"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let UnitService = class UnitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUnitDto, userId) {
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
    async getUnit(unitId) {
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
            throw new common_1.NotFoundException(`Unit with ID ${unitId} not found`);
        }
        return {
            unit,
        };
    }
    async getUnitForLearning(unitId) {
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
            throw new common_1.NotFoundException(`Unit with ID ${unitId} not found`);
        }
        return {
            unit,
        };
    }
    async update(unitId, updateUnitDto) {
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
    async delete(unitId) {
        const unit = await this.prisma.unit.delete({
            where: { id: unitId },
        });
        return { unit };
    }
    async bulkUpdate(data) {
        const { courseId, units } = data;
        console.log('Bulk Update Request:', JSON.stringify({
            courseId,
            unitIds: units.map((u) => u.id),
        }, null, 2));
        try {
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
                throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
            }
            const existingUnits = new Set(course.units.map((u) => u.id));
            const invalidUnits = units.filter((u) => !existingUnits.has(u.id));
            if (invalidUnits.length > 0) {
                throw new common_1.NotFoundException(`Units with IDs [${invalidUnits.map((u) => u.id).join(', ')}] not found in course ${courseId}`);
            }
            const existingLessonMap = new Map(course.units.flatMap((u) => u.lessons.map((l) => [l.id, l])));
            const allRequestedLessons = units.flatMap((u) => u.lessons || []);
            const invalidLessons = allRequestedLessons.filter((l) => !existingLessonMap.has(l.id));
            if (invalidLessons.length > 0) {
                throw new common_1.NotFoundException(`Lessons with IDs [${invalidLessons.map((l) => l.id).join(', ')}] not found in course ${courseId}`);
            }
            return await this.prisma.$transaction(async (tx) => {
                const processedLessons = new Set();
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
                    }
                    catch (error) {
                        throw new common_1.BadRequestException(`Failed to update unit ${unit.id}: ${error.message}`);
                    }
                    if (unit.lessons?.length > 0) {
                        for (const lesson of unit.lessons) {
                            if (processedLessons.has(lesson.id)) {
                                throw new common_1.BadRequestException(`Lesson ${lesson.id} appears multiple times in update request`);
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
                            }
                            catch (error) {
                                throw new common_1.BadRequestException(`Failed to update lesson ${lesson.id} in unit ${unit.id}: ${error.message}`);
                            }
                        }
                    }
                }
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
        }
        catch (error) {
            console.error('Bulk update error:', error);
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('One or more records not found. Please check if all units and lessons exist.');
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Failed to update units: ${error.message}`);
        }
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitService);
//# sourceMappingURL=unit.service.js.map