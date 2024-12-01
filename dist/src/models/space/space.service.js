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
exports.SpaceService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_queries_helper_1 = require("../../common/helper/prisma-queries.helper");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_1 = require("../../common/utils/pagination");
let SpaceService = class SpaceService {
    constructor(prisma) {
        this.prisma = prisma;
        this.spaceIncludeQuery = {
            _count: {
                select: {
                    essays: true,
                    vocabularies: true,
                    notes: true,
                },
            },
        };
    }
    async create(createSpaceDto, created_by) {
        const creatorId = String(created_by.sub);
        const user = await this.prisma.user.findFirst({
            where: { id: creatorId, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!user)
            throw new common_1.NotFoundException(`User ${created_by} not found`);
        const space = await this.prisma.space.create({
            data: {
                ...createSpaceDto,
                creator: { connect: { id: creatorId } },
            },
        });
        return { space };
    }
    async findAll(findAllSpacesDto) {
        const { page, perPage, search } = findAllSpacesDto;
        const queryOptions = {
            where: {
                ...prisma_queries_helper_1.notDeletedQuery,
                ...(0, prisma_queries_helper_1.searchQuery)(search, ['name', 'description']),
            },
            include: this.spaceIncludeQuery,
            orderBy: { createdAt: 'desc' },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
        };
        const [spaces, totalItems] = await Promise.all([
            this.prisma.space.findMany(queryOptions),
            this.prisma.space.count({ where: queryOptions.where }),
        ]);
        return {
            data: spaces,
            pagination: (0, pagination_1.calculatePagination)(totalItems, findAllSpacesDto),
        };
    }
    async findOne(id) {
        const space = await this.prisma.space.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
            include: this.spaceIncludeQuery,
        });
        if (!space)
            throw new common_1.NotFoundException(`Space ${id} not found`);
        return { space };
    }
    async update(id, updateSpaceDto) {
        const space = await this.prisma.space.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!space)
            throw new common_1.NotFoundException(`Space ${id} not found`);
        const updated = await this.prisma.space.update({
            where: { id },
            data: updateSpaceDto,
            include: this.spaceIncludeQuery,
        });
        return {
            space: updated,
        };
    }
    async delete(id) {
        const space = await this.prisma.space.findUnique({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!space) {
            throw new common_1.NotFoundException(`Space with ID ${id} not found`);
        }
        const updatedSpace = await this.prisma.space.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
        return {
            space: updatedSpace,
        };
    }
    async findUserSpaces(input) {
        const { userId, page, perPage, search } = input;
        const queryOptions = {
            where: {
                createdBy: userId,
                ...prisma_queries_helper_1.notDeletedQuery,
                ...(0, prisma_queries_helper_1.searchQuery)(search, ['name', 'description']),
            },
            include: this.spaceIncludeQuery,
            orderBy: { createdAt: 'desc' },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
        };
        const [spaces, totalItems] = await Promise.all([
            this.prisma.space.findMany(queryOptions),
            this.prisma.space.count({ where: queryOptions.where }),
        ]);
        return {
            data: spaces,
            ...(page &&
                perPage && {
                pagination: (0, pagination_1.calculatePagination)(totalItems, { page, perPage }),
            }),
        };
    }
    async getSpacesUser(userId, query) {
        const { page, perPage, search } = query;
        const skip = (page - 1) * perPage;
        const where = {
            createdBy: userId,
            ...(search && { name: { contains: search, mode: 'insensitive' } }),
        };
        const [spaces, totalItems] = await Promise.all([
            this.prisma.space.findMany({
                where,
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
                include: {
                    creator: true,
                },
            }),
            this.prisma.space.count({ where }),
        ]);
        const pagination = {
            totalItems: totalItems,
            currentPage: page,
            itemsPerPage: perPage,
            totalPages: Math.ceil(totalItems / perPage),
            hasNextPage: page * perPage < totalItems,
            hasPreviousPage: page > 1,
        };
        return {
            data: spaces,
            pagination,
        };
    }
    async getSpaceCoursesJoined(userId, spaceId, page, perPage) {
        const skip = (page - 1) * perPage;
        const [courses, total] = await Promise.all([
            this.prisma.course.findMany({
                where: {
                    spaces: {
                        some: {
                            spaceId,
                        },
                    },
                    ...prisma_queries_helper_1.notDeletedQuery,
                },
                include: {
                    creator: true,
                    progress: {
                        where: {
                            userId,
                        },
                    },
                },
                skip,
                take: perPage,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.course.count({
                where: {
                    spaces: {
                        some: {
                            spaceId,
                        },
                    },
                    ...prisma_queries_helper_1.notDeletedQuery,
                },
            }),
        ]);
        return {
            data: courses.map((course) => ({
                ...course,
                progress: course.progress[0] || null,
            })),
            pagination: {
                totalItems: total,
                currentPage: page,
                itemsPerPage: perPage,
                totalPages: Math.ceil(total / perPage),
                hasNextPage: page * perPage < total,
                hasPreviousPage: page > 1,
            },
        };
    }
    async getSpaceCourses(userId, spaceId, query) {
        const { page, perPage, search, language, minLevel, maxLevel, topics, courseType, status, } = query;
        const skip = (page - 1) * perPage;
        const whereClause = {
            deletedAt: null,
            ...(status ? { status } : { ...prisma_queries_helper_1.isPublishedQuery }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(language && { language }),
            ...(minLevel && { minLevel }),
            ...(maxLevel && { maxLevel }),
            ...(courseType && { courseType }),
            ...(topics?.length && { topics: { hasEvery: topics } }),
        };
        const [courses, total] = await Promise.all([
            this.prisma.course.findMany({
                where: whereClause,
                include: {
                    creator: true,
                    spaces: {
                        where: { spaceId },
                        select: { joinedAt: true },
                    },
                    ...(userId && {
                        progress: {
                            where: { userId },
                        },
                    }),
                },
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.course.count({ where: whereClause }),
        ]);
        const transformedCourses = courses.map((course) => ({
            ...course,
            isJoined: course.spaces.length > 0,
            joinedAt: course.spaces[0]?.joinedAt || null,
            spaces: undefined,
            progress: userId ? course.progress?.[0] || null : null,
            isPublished: course.status === client_1.ContentStatus.published,
        }));
        return {
            data: transformedCourses,
            pagination: {
                totalItems: total,
                currentPage: page,
                itemsPerPage: perPage,
                totalPages: Math.ceil(total / perPage),
                hasNextPage: page * perPage < total,
                hasPreviousPage: page > 1,
            },
        };
    }
};
exports.SpaceService = SpaceService;
exports.SpaceService = SpaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpaceService);
//# sourceMappingURL=space.service.js.map