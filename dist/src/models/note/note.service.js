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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_queries_helper_1 = require("../../common/helper/prisma-queries.helper");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_1 = require("../../common/utils/pagination");
let NoteService = class NoteService {
    constructor(prisma) {
        this.prisma = prisma;
        this.selectQuery = {
            id: true,
            spaceId: true,
            lessonId: true,
            courseId: true,
            unitId: true,
            title: true,
            content: true,
            tags: true,
            isBookmarked: true,
            createdAt: true,
            lesson: {
                select: {
                    id: true,
                    unitId: true,
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
                },
            },
        };
    }
    async createOrUpdate(dto, currentUser) {
        const lesson = await this.prisma.lesson.findFirst({
            where: { id: dto.lessonId },
        });
        if (!lesson)
            throw new common_1.NotFoundException(`Lesson ${dto.lessonId} not found`);
        const existingNote = await this.prisma.note.findFirst({
            where: {
                lessonId: dto.lessonId,
                createdBy: String(currentUser.sub),
                ...prisma_queries_helper_1.notDeletedQuery,
            },
        });
        const note = existingNote
            ? await this.prisma.note.update({
                where: { id: existingNote.id },
                data: {
                    ...dto,
                    tags: dto.tags,
                },
            })
            : await this.prisma.note.create({
                data: {
                    ...dto,
                    tags: dto.tags,
                    createdBy: String(currentUser.sub),
                },
            });
        return { note };
    }
    async create(dto, currentUser) {
        const space = await this.prisma.space.findFirst({
            where: { id: dto.spaceId, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!space)
            throw new common_1.NotFoundException(`Space ${dto.spaceId} not found`);
        const lesson = await this.prisma.lesson.findFirst({
            where: { id: dto.lessonId },
        });
        if (!lesson)
            throw new common_1.NotFoundException(`Lesson ${dto.lessonId} not found`);
        const note = await this.prisma.note.create({
            data: {
                ...dto,
                tags: dto.tags,
                createdBy: String(currentUser.sub),
            },
        });
        return { note };
    }
    async findAll(query) {
        const { page, perPage, search, tags, isBookmarked, spaceId } = query;
        const where = {
            ...prisma_queries_helper_1.notDeletedQuery,
            ...(spaceId && { spaceId }),
            ...(0, prisma_queries_helper_1.searchQuery)(search, ['title', 'content']),
            ...(isBookmarked !== undefined && { isBookmarked }),
            ...(tags?.length && {
                tags: {
                    hasSome: tags.map((tag) => tag.toLowerCase()),
                },
            }),
        };
        const [notes, totalItems] = await Promise.all([
            this.prisma.note.findMany({
                where,
                orderBy: [{ isBookmarked: 'desc' }, { createdAt: 'desc' }],
                select: this.selectQuery,
                ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
            }),
            this.prisma.note.count({ where }),
        ]);
        return {
            data: notes,
            pagination: (0, pagination_1.calculatePagination)(totalItems, query),
        };
    }
    async findOne(id) {
        const note = await this.prisma.note.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!note)
            throw new common_1.NotFoundException(`Note ${id} not found`);
        return { note };
    }
    async findOneByLessonId(lessonId) {
        const note = await this.prisma.note.findFirst({
            where: { lessonId, ...prisma_queries_helper_1.notDeletedQuery },
        });
        return { note };
    }
    async update(id, dto) {
        const note = await this.prisma.note.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!note)
            throw new common_1.NotFoundException(`Note ${id} not found`);
        const updated = await this.prisma.note.update({
            where: { id },
            data: {
                ...dto,
                tags: dto.tags,
            },
        });
        return { note: updated };
    }
    async delete(id) {
        const note = await this.prisma.note.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!note)
            throw new common_1.NotFoundException(`Note ${id} not found`);
        const deleted = await this.prisma.note.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        return { note: deleted };
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NoteService);
//# sourceMappingURL=note.service.js.map