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
exports.EssayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_queries_helper_1 = require("../../common/helper/prisma-queries.helper");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_1 = require("../../common/utils/pagination");
const hashtag_service_1 = require("../hashtag/hashtag.service");
let EssayService = class EssayService {
    constructor(prisma, hashTagService) {
        this.prisma = prisma;
        this.hashTagService = hashTagService;
        this.defaultInclude = {
            author: true,
            hashtags: {
                include: {
                    hashtag: true,
                },
            },
            _count: {
                select: { corrections: true },
            },
        };
    }
    async findAllByUser(query, user) {
        const { page, perPage, search, status } = query;
        const queryOptions = {
            where: {
                createdBy: String(user.sub),
                ...prisma_queries_helper_1.notDeletedQuery,
                ...(0, prisma_queries_helper_1.searchQuery)(search, ['title', 'summary']),
                ...(status && { status }),
            },
            include: this.defaultInclude,
            orderBy: { createdAt: 'desc' },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
        };
        const [essays, totalItems] = await Promise.all([
            this.prisma.essay.findMany(queryOptions),
            this.prisma.essay.count({ where: queryOptions.where }),
        ]);
        return {
            data: essays,
            pagination: (0, pagination_1.calculatePagination)(totalItems, query),
        };
    }
    async create(tx, createEssayDto, user) {
        const { spaceId, hashtag_names, ...data } = createEssayDto;
        const hashtagIds = hashtag_names?.length
            ? await this.hashTagService.findOrCreateHashtags(hashtag_names)
            : [];
        const essay = await tx.essay.create({
            data: {
                title: data.title,
                summary: data.summary,
                content: data.content,
                coverUrl: data.cover_url,
                status: data.status,
                language: data.language,
                upvoteCount: 0,
                author: { connect: { id: String(user.sub) } },
                space: { connect: { id: spaceId } },
                hashtags: {
                    create: hashtagIds.map((hashtagId) => ({
                        hashtag: { connect: { id: hashtagId } },
                    })),
                },
            },
            include: this.defaultInclude,
        });
        return this.mapEssayResponse(essay);
    }
    async findAll(query) {
        const { page, perPage, search, status } = query;
        const queryOptions = {
            where: {
                ...prisma_queries_helper_1.notDeletedQuery,
                ...(0, prisma_queries_helper_1.searchQuery)(search, ['title', 'summary']),
                ...(status && { status }),
            },
            include: this.defaultInclude,
            orderBy: { createdAt: 'desc' },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
        };
        const [essays, totalItems] = await Promise.all([
            this.prisma.essay.findMany(queryOptions),
            this.prisma.essay.count({ where: queryOptions.where }),
        ]);
        return {
            data: essays,
            pagination: (0, pagination_1.calculatePagination)(totalItems, query),
        };
    }
    async findOne(id) {
        const essay = await this.prisma.essay.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
            include: this.defaultInclude,
        });
        if (!essay)
            throw new common_1.NotFoundException(`Essay ${id} not found`);
        return { essay };
    }
    async update(tx, id, updateEssayDto, user) {
        const essay = await tx.essay.findFirst({
            where: {
                id,
                createdBy: String(user.sub),
                ...prisma_queries_helper_1.notDeletedQuery,
            },
        });
        if (!essay)
            throw new common_1.NotFoundException(`Essay ${id} not found or unauthorized`);
        const { hashtag_names, ...updateData } = updateEssayDto;
        const hashtagIds = hashtag_names?.length
            ? await this.hashTagService.findOrCreateHashtags(hashtag_names)
            : null;
        const updated = await tx.essay.update({
            where: { id },
            data: {
                ...updateData,
                ...(hashtagIds && {
                    hashtags: {
                        deleteMany: {},
                        create: hashtagIds.map((hashtagId) => ({
                            hashtag: { connect: { id: hashtagId } },
                        })),
                    },
                }),
            },
            include: this.defaultInclude,
        });
        return { essay: updated };
    }
    async deleteByUser(id) {
        return await this.prisma.$transaction(async (tx) => {
            const essay = await tx.essay.findFirst({
                where: { id, ...prisma_queries_helper_1.notDeletedQuery },
            });
            if (!essay)
                throw new common_1.NotFoundException(`Essay ${id} not found`);
            const deleted = await tx.essay.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
            return { essay: deleted };
        });
    }
    async delete(id) {
        return await this.prisma.$transaction(async (tx) => {
            const essay = await tx.essay.findFirst({
                where: { id },
            });
            if (!essay)
                throw new common_1.NotFoundException(`Essay ${id} not found`);
            const deleted = await tx.essay.delete({
                where: { id },
            });
            return { essay: deleted };
        });
    }
    mapEssayResponse(essay) {
        return {
            id: essay.id,
            id_space: essay.spaceId,
            title: essay.title,
            summary: essay.summary,
            upvote_count: essay.upvoteCount,
            content: essay.content,
            cover_url: essay.coverUrl,
            status: essay.status,
            language: essay.language,
            hashtags: essay.hashtags,
            author: essay.author,
        };
    }
};
exports.EssayService = EssayService;
exports.EssayService = EssayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        hashtag_service_1.HashtagService])
], EssayService);
//# sourceMappingURL=essay.service.js.map