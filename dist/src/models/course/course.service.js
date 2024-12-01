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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_queries_helper_1 = require("../../common/helper/prisma-queries.helper");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_1 = require("../../common/utils/pagination");
let CourseService = class CourseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCourseDto, userId) {
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
                status: createCourseDto.status || client_1.ContentStatus.draft,
                isPremium: createCourseDto.isPremium || false,
                createdBy: userId,
            },
            include: {
                creator: true,
            },
        });
        return { course };
    }
    async update(id, updateCourseDto) {
        const course = await this.prisma.course.findFirst({
            where: { id, deletedAt: null },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course ${id} not found`);
        }
        const updated = await this.prisma.course.update({
            where: { id },
            data: {
                ...updateCourseDto,
                status: updateCourseDto.status || undefined,
                isPremium: updateCourseDto.isPremium || undefined,
            },
            include: {
                creator: true,
                units: {
                    include: {
                        lessons: true,
                    },
                    orderBy: {
                        orderIndex: 'asc',
                    },
                },
            },
        });
        return { course: updated };
    }
    async delete(id) {
        const course = await this.prisma.course.findFirst({
            where: { id, deletedAt: null },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
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
    async getAll(query) {
        const { search, page, perPage } = query;
        const queryOptions = {
            where: {
                ...prisma_queries_helper_1.notDeletedQuery,
                ...(0, prisma_queries_helper_1.searchQuery)(search, ['title', 'description']),
            },
            include: {
                creator: true,
                spaces: true,
            },
            orderBy: { createdAt: 'desc' },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
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
            pagination: (0, pagination_1.calculatePagination)(totalItems, { page, perPage }),
        };
    }
    async getById(id) {
        const course = await this.prisma.course.findFirst({
            where: {
                id,
                ...prisma_queries_helper_1.notDeletedQuery,
            },
            include: {
                creator: true,
                units: {
                    include: {
                        lessons: true,
                    },
                    orderBy: {
                        orderIndex: 'asc',
                    },
                },
            },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return {
            course,
        };
    }
    async getCourseUnits(courseId, query) {
        const { search, page, perPage } = query;
        const queryOptions = {
            where: {
                courseId,
                ...(0, prisma_queries_helper_1.searchQuery)(search, ['title', 'description']),
            },
            orderBy: {
                orderIndex: 'asc',
            },
            include: {
                lessons: {
                    orderBy: {
                        orderIndex: 'asc',
                    },
                    select: {
                        id: true,
                        title: true,
                        summary: true,
                        orderIndex: true,
                        isPremium: true,
                        isRequired: true,
                        status: true,
                        createdBy: true,
                        createdAt: true,
                        updatedAt: true,
                        lessonWeight: true,
                        unitId: true,
                    },
                },
            },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
        };
        const [units, totalItems] = await Promise.all([
            this.prisma.unit.findMany(queryOptions),
            this.prisma.unit.count({ where: queryOptions.where }),
        ]);
        console.log(units);
        return {
            data: units,
            pagination: (0, pagination_1.calculatePagination)(totalItems, query),
        };
    }
    async joinCourse(userId, courseId, spaceId) {
        const firstUnit = await this.prisma.unit.findFirst({
            where: { courseId },
            orderBy: { orderIndex: 'asc' },
            select: {
                id: true,
                lessons: {
                    orderBy: { orderIndex: 'asc' },
                    take: 1,
                    select: { id: true },
                },
            },
        });
        if (!firstUnit) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
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
                        currentLessonId: firstUnit.lessons[0]?.id,
                        completedWeight: 0,
                        completedUnits: [],
                        completedLessons: [],
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
    async getLearnCourse(courseId) {
        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
            include: {
                units: {
                    orderBy: {
                        orderIndex: 'asc',
                    },
                    select: {
                        id: true,
                        title: true,
                        orderIndex: true,
                        isPremium: true,
                        lessons: {
                            orderBy: {
                                orderIndex: 'asc',
                            },
                            select: {
                                id: true,
                                title: true,
                                orderIndex: true,
                                isPremium: true,
                                isRequired: true,
                                status: true,
                                lessonWeight: true,
                            },
                        },
                    },
                },
            },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course ${courseId} not found`);
        }
        return {
            course,
        };
    }
    async checkJoinedCourse(courseId, spaceId) {
        const spaceCourse = await this.prisma.spaceCourse.findUnique({
            where: {
                spaceId_courseId: {
                    spaceId,
                    courseId,
                },
            },
            include: {
                course: {
                    include: {
                        progress: {
                            where: {
                                courseId,
                            },
                        },
                    },
                },
            },
        });
        if (!spaceCourse) {
            return {
                check: false,
                progress: null,
            };
        }
        const progress = spaceCourse.course.progress[0] || null;
        return {
            check: true,
            progress,
        };
    }
    async getCourseProgress(courseId, userId) {
        const progress = await this.prisma.courseProgress.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (!progress) {
            const initialProgress = await this.prisma.courseProgress.create({
                data: {
                    userId,
                    courseId,
                    completedWeight: 0,
                    completedUnits: [],
                    completedLessons: [],
                    lastAccessedAt: new Date(),
                },
            });
            return { courseProgress: initialProgress };
        }
        return { courseProgress: progress };
    }
    async updateCourseProgress(courseId, userId, updateProgressDto) {
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
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map