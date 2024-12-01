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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyService = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const common_2 = require("../../common/enum/common");
const prisma_queries_helper_1 = require("../../common/helper/prisma-queries.helper");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_1 = require("../../common/utils/pagination");
const create_vocabulary_dto_1 = require("./dto/create-vocabulary.dto");
let VocabularyService = class VocabularyService {
    constructor(prisma) {
        this.prisma = prisma;
        this.includeQuery = {
            creator: true,
            space: true,
        };
    }
    async create(createVocabularyDto, currentUser) {
        const { spaceId, ...data } = createVocabularyDto;
        const creatorId = String(currentUser.sub);
        const space = await this.prisma.space.findFirst({
            where: { id: spaceId, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!space)
            throw new common_1.NotFoundException(`Space ${spaceId} not found`);
        const user = await this.prisma.user.findFirst({
            where: { id: creatorId, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!user)
            throw new common_1.NotFoundException(`User ${creatorId} not found`);
        const vocabulary = await this.prisma.vocabulary.create({
            data: {
                ...data,
                createdBy: creatorId,
                spaceId,
            },
            include: this.includeQuery,
        });
        return { vocabulary };
    }
    async findAll(query) {
        const { page, perPage, search, dueDate, spaceId, tags } = query;
        console.log(search);
        const where = {
            ...prisma_queries_helper_1.notDeletedQuery,
            ...(spaceId && { spaceId }),
            ...(0, prisma_queries_helper_1.searchQuery)(search, ['term']),
            ...(dueDate && {
                nextReview: {
                    not: null,
                    lte: new Date(new Date().setHours(23, 59, 59, 999)),
                },
                repetitionLevel: {
                    lt: common_2.RepetitionLevel.MASTERED,
                },
            }),
            ...(tags?.length && {
                tags: {
                    hasSome: tags.map((tag) => tag.toLowerCase()),
                },
            }),
        };
        const [vocabularies, totalItems] = await Promise.all([
            this.prisma.vocabulary.findMany({
                where,
                orderBy: [{ nextReview: 'asc' }, { createdAt: 'desc' }],
                ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
            }),
            this.prisma.vocabulary.count({ where }),
        ]);
        return {
            data: vocabularies,
            pagination: (0, pagination_1.calculatePagination)(totalItems, query),
        };
    }
    async findOne(id) {
        const vocabulary = await this.prisma.vocabulary.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
            include: this.includeQuery,
        });
        if (!vocabulary)
            throw new common_1.NotFoundException(`Vocabulary ${id} not found`);
        return { vocabulary };
    }
    async update(id, updateVocabularyDto) {
        const vocabulary = await this.prisma.vocabulary.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!vocabulary)
            throw new common_1.NotFoundException(`Vocabulary ${id} not found`);
        const updated = await this.prisma.vocabulary.update({
            where: { id },
            data: updateVocabularyDto,
        });
        return { vocabulary: updated };
    }
    async delete(id) {
        const vocabulary = await this.prisma.vocabulary.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!vocabulary)
            throw new common_1.NotFoundException(`Vocabulary ${id} not found`);
        const softDeletedVocabulary = await this.prisma.vocabulary.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        return { vocabulary: softDeletedVocabulary };
    }
};
exports.VocabularyService = VocabularyService;
__decorate([
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vocabulary_dto_1.CreateVocabularyDto, Object]),
    __metadata("design:returntype", Promise)
], VocabularyService.prototype, "create", null);
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VocabularyService);
//# sourceMappingURL=vocabulary.service.js.map