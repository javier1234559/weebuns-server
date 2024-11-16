import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import {
  notDeletedQuery,
  paginationQuery,
} from 'src/common/helper/prisma-queries.helper';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CorrectionResponseAllDto } from 'src/models/correction/dto/correction-all-response.dto copy';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
import { CreateCorrectionDto } from 'src/models/correction/dto/create-correction.dto';
import { GetCorrectionsByEssayDto } from 'src/models/correction/dto/get-correction-by-essay.dto';
import { UpdateCorrectionDto } from 'src/models/correction/dto/update-correction.dto';

@Injectable()
export class CorrectionService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeQuery = {
    creator: true,
    sentences: {
      orderBy: {
        index: 'asc',
      },
    },
  } as const;

  private buildCorrectionSearchQuery = (search?: string) => {
    if (!search) return {};

    return {
      OR: [
        { overallComment: { contains: search, mode: 'insensitive' } },
        {
          sentences: {
            some: {
              OR: ['originalText', 'correctedText', 'explanation'].map(
                (field) => ({
                  [field]: { contains: search, mode: 'insensitive' },
                }),
              ),
            },
          },
        },
      ],
    };
  };

  async getByUserId(
    userId: string,
    essayId: string,
  ): Promise<CorrectionResponseOneDto> {
    return await this.prisma.correction.findFirst({
      where: {
        essayId,
        createdBy: userId,
      },
      include: this.includeQuery,
    });
  }

  async getAllByEssay(
    input: GetCorrectionsByEssayDto,
  ): Promise<CorrectionResponseAllDto> {
    const { essayId, page, perPage, search } = input;

    const queryOptions = {
      where: {
        essayId,
        ...this.buildCorrectionSearchQuery(search),
      },
      include: this.includeQuery,
      orderBy: { createdAt: 'desc' },
      ...paginationQuery(page, perPage),
    };

    const [corrections, totalItems] = await Promise.all([
      this.prisma.correction.findMany(queryOptions),
      this.prisma.correction.count({ where: queryOptions.where }),
    ]);

    return {
      data: corrections,
      ...(page &&
        perPage && {
          pagination: calculatePagination(totalItems, { page, perPage }),
        }),
    };
  }

  async create(
    tx: Prisma.TransactionClient,
    userId: string,
    createCorrectionDto: CreateCorrectionDto,
  ): Promise<CorrectionResponseOneDto> {
    // Validate user and essay exist
    const [user, essay] = await Promise.all([
      tx.user.findFirst({
        where: { id: userId, ...notDeletedQuery },
      }),
      tx.essay.findFirst({
        where: { id: createCorrectionDto.essay_id, ...notDeletedQuery },
      }),
    ]);

    if (!user) throw new NotFoundException(`User ${userId} not found`);
    if (!essay)
      throw new NotFoundException(
        `Essay ${createCorrectionDto.essay_id} not found`,
      );

    // Create correction with nested sentences in one transaction
    const correction = await tx.correction.create({
      data: {
        essayId: createCorrectionDto.essay_id, // Use direct field instead of connect
        createdBy: userId, // Use direct field instead of connect
        overallComment: createCorrectionDto.overall_comment,
        rating: createCorrectionDto.rating,
        sentences: {
          create: createCorrectionDto.sentences.map((sentence) => ({
            index: sentence.index,
            originalText: sentence.original_text,
            correctedText: sentence.corrected_text || '', // Handle null/undefined
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

  async update(
    tx: Prisma.TransactionClient,
    userId: string,
    updateCorrectionDto: UpdateCorrectionDto,
  ): Promise<CorrectionResponseOneDto> {
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

  private async validateCorrectionOwnership(
    correctionId: string,
    userId: string,
  ): Promise<void> {
    const correction = await this.prisma.correction.findUnique({
      where: { id: correctionId },
      select: { createdBy: true },
    });

    if (!correction) {
      throw new NotFoundException(`Correction ${correctionId} not found`);
    }

    if (correction.createdBy !== userId) {
      throw new UnauthorizedException(
        'Not authorized to update this correction',
      );
    }
  }

  private async handleSentencesUpdate(
    tx: Prisma.TransactionClient,
    updateCorrectionDto: UpdateCorrectionDto,
  ): Promise<void> {
    const existingSentences = await tx.correctionSentence.findMany({
      where: { correctionId: updateCorrectionDto.id },
    });

    const existingSentenceMap = new Map(
      existingSentences.map((sentence) => [sentence.index, sentence]),
    );
    const processedIndexes = new Set<number>();

    // Update/Create sentences
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
      } else {
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

    // Delete unprocessed sentences
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
}
