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
exports.CorrectionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_queries_helper_1 = require("../../common/helper/prisma-queries.helper");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_1 = require("../../common/utils/pagination");
let CorrectionService = class CorrectionService {
    constructor(prisma) {
        this.prisma = prisma;
        this.includeQuery = {
            creator: true,
            sentences: {
                orderBy: {
                    index: 'asc',
                },
            },
        };
        this.buildCorrectionSearchQuery = (search) => {
            if (!search)
                return {};
            return {
                OR: [
                    { overallComment: { contains: search, mode: 'insensitive' } },
                    {
                        sentences: {
                            some: {
                                OR: ['originalText', 'correctedText', 'explanation'].map((field) => ({
                                    [field]: { contains: search, mode: 'insensitive' },
                                })),
                            },
                        },
                    },
                ],
            };
        };
    }
    async getByUserId(userId, essayId) {
        return await this.prisma.correction.findFirst({
            where: {
                essayId,
                createdBy: userId,
            },
            include: this.includeQuery,
        });
    }
    async getAllByEssay(input) {
        const { essayId, page, perPage, search } = input;
        const queryOptions = {
            where: {
                essayId,
                ...this.buildCorrectionSearchQuery(search),
            },
            include: this.includeQuery,
            orderBy: { createdAt: 'desc' },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
        };
        const [corrections, totalItems] = await Promise.all([
            this.prisma.correction.findMany(queryOptions),
            this.prisma.correction.count({ where: queryOptions.where }),
        ]);
        return {
            data: corrections,
            ...(page &&
                perPage && {
                pagination: (0, pagination_1.calculatePagination)(totalItems, { page, perPage }),
            }),
        };
    }
    async create(tx, userId, createCorrectionDto) {
        const [user, essay] = await Promise.all([
            tx.user.findFirst({
                where: { id: userId, ...prisma_queries_helper_1.notDeletedQuery },
            }),
            tx.essay.findFirst({
                where: { id: createCorrectionDto.essay_id, ...prisma_queries_helper_1.notDeletedQuery },
            }),
        ]);
        if (!user)
            throw new common_1.NotFoundException(`User ${userId} not found`);
        if (!essay)
            throw new common_1.NotFoundException(`Essay ${createCorrectionDto.essay_id} not found`);
        const correction = await tx.correction.create({
            data: {
                essayId: createCorrectionDto.essay_id,
                createdBy: userId,
                overallComment: createCorrectionDto.overall_comment,
                rating: createCorrectionDto.rating,
                sentences: {
                    create: createCorrectionDto.sentences.map((sentence) => ({
                        index: sentence.index,
                        originalText: sentence.original_text,
                        correctedText: sentence.corrected_text || '',
                        explanation: sentence.explanation || '',
                        isCorrect: sentence.is_correct,
                        rating: sentence.rating,
                    })),
                },
            },
            include: this.includeQuery,
        });
        return correction;
    }
    async update(tx, userId, updateCorrectionDto) {
        await this.validateCorrectionOwnership(updateCorrectionDto.id, userId);
        await this.handleSentencesUpdate(tx, updateCorrectionDto);
        return tx.correction.update({
            where: { id: updateCorrectionDto.id },
            data: {
                overallComment: updateCorrectionDto.overall_comment,
                rating: updateCorrectionDto.rating,
            },
            include: this.includeQuery,
        });
    }
    async validateCorrectionOwnership(correctionId, userId) {
        const correction = await this.prisma.correction.findUnique({
            where: { id: correctionId },
            select: { createdBy: true },
        });
        if (!correction) {
            throw new common_1.NotFoundException(`Correction ${correctionId} not found`);
        }
        if (correction.createdBy !== userId) {
            throw new common_1.UnauthorizedException('Not authorized to update this correction');
        }
    }
    async handleSentencesUpdate(tx, updateCorrectionDto) {
        const existingSentences = await tx.correctionSentence.findMany({
            where: { correctionId: updateCorrectionDto.id },
        });
        const existingSentenceMap = new Map(existingSentences.map((sentence) => [sentence.index, sentence]));
        const processedIndexes = new Set();
        for (const sentence of updateCorrectionDto.sentences) {
            processedIndexes.add(sentence.index);
            const existing = existingSentenceMap.get(sentence.index);
            if (existing) {
                await tx.correctionSentence.update({
                    where: { id: existing.id },
                    data: {
                        correctedText: sentence.corrected_text,
                        explanation: sentence.explanation,
                        isCorrect: sentence.is_correct,
                        rating: sentence.rating,
                    },
                });
            }
            else {
                await tx.correctionSentence.create({
                    data: {
                        correctionId: updateCorrectionDto.id,
                        index: sentence.index,
                        originalText: sentence.original_text,
                        correctedText: sentence.corrected_text,
                        explanation: sentence.explanation,
                        isCorrect: sentence.is_correct,
                        rating: sentence.rating,
                    },
                });
            }
        }
        await tx.correctionSentence.deleteMany({
            where: {
                id: {
                    in: existingSentences
                        .filter((s) => !processedIndexes.has(s.index))
                        .map((s) => s.id),
                },
            },
        });
    }
};
exports.CorrectionService = CorrectionService;
exports.CorrectionService = CorrectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CorrectionService);
//# sourceMappingURL=correction.service.js.map