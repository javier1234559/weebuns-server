import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CorrectionResponseAllDto } from 'src/models/correction/dto/correction-all-response.dto copy';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
import { CreateCorrectionDto } from 'src/models/correction/dto/create-correction.dto';
import { GetCorrectionsByEssay } from 'src/models/correction/dto/get-correction-by-essay.dto';
import { UpdateCorrectionDto } from 'src/models/correction/dto/update-correction.dto';

@Injectable()
export class CorrectionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByEssay(
    input: GetCorrectionsByEssay,
  ): Promise<CorrectionResponseAllDto> {
    const { essayId, page, perPage, search } = input;
    const isPaginated = page !== undefined && perPage !== undefined;

    let where: Prisma.CorrectionWhereInput = {
      essay_id: essayId,
    };

    if (search) {
      where = {
        ...where,
        OR: [
          { overall_comment: { contains: search, mode: 'insensitive' } },
          {
            sentences: {
              some: {
                OR: [
                  { original_text: { contains: search, mode: 'insensitive' } },
                  { corrected_text: { contains: search, mode: 'insensitive' } },
                  { explanation: { contains: search, mode: 'insensitive' } },
                ],
              },
            },
          },
        ],
      };
    }

    const queryOptions: Prisma.CorrectionFindManyArgs = {
      where,
      orderBy: { created_at: 'desc' },
      include: {
        creator: true,
        sentences: true,
      },
    };

    // Add pagination if requested
    if (isPaginated) {
      queryOptions.skip = (page! - 1) * perPage!;
      queryOptions.take = perPage;
    }

    const [corrections, totalItems] = await Promise.all([
      this.prisma.correction.findMany(queryOptions),
      this.prisma.correction.count({ where }),
    ]);

    const response: CorrectionResponseAllDto = {
      data: corrections,
    };

    if (isPaginated) {
      response.pagination = calculatePagination(totalItems, {
        page: page!,
        perPage: perPage!,
      });
    }

    return response;
  }

  async create(
    createCorrectionDto: CreateCorrectionDto,
  ): Promise<CorrectionResponseOneDto> {
    // Use transaction to ensure atomic operation
    const correction = await this.prisma.$transaction(async (tx) => {
      // First create the correction
      const newCorrection = await tx.correction.create({
        data: {
          essay_id: createCorrectionDto.essay_id,
          created_by: createCorrectionDto.created_by,
          overall_comment: createCorrectionDto.overall_comment,
          rating: createCorrectionDto.rating,
        },
      });

      // Then create all correction sentences
      await tx.correctionSentence.createMany({
        data: createCorrectionDto.sentences.map((sentence) => ({
          id_correction: newCorrection.id,
          index: sentence.index,
          original_text: sentence.original_text,
          corrected_text: sentence.corrected_text,
          explanation: sentence.explanation,
          is_correct: sentence.is_correct,
          rating: sentence.rating,
        })),
      });

      // Return the complete correction with its sentences
      return tx.correction.findUnique({
        where: { id: newCorrection.id },
        include: {
          creator: true,
          sentences: true,
        },
      });
    });

    return correction;
  }

  async update(
    tx: Prisma.TransactionClient,
    updateCorrectionDto: UpdateCorrectionDto,
  ): Promise<CorrectionResponseOneDto> {
    // Step 1: Validate ownership
    await this.validateCorrectionOwnership(
      updateCorrectionDto.id,
      updateCorrectionDto.userId,
    );

    // Step 2: Update main correction record
    await tx.correction.update({
      where: { id: updateCorrectionDto.id },
      data: {
        overall_comment: updateCorrectionDto.overall_comment,
        rating: updateCorrectionDto.rating,
      },
    });

    // Step 3: Handle sentences update
    await this.handleSentencesUpdate(tx, updateCorrectionDto);

    // Step 4: Return updated correction
    return tx.correction.findUnique({
      where: { id: updateCorrectionDto.id },
      include: {
        creator: true,
        sentences: {
          orderBy: {
            index: 'asc',
          },
        },
      },
    });
  }

  private async validateCorrectionOwnership(
    correctionId: string,
    userId: string,
  ): Promise<void> {
    const existingCorrection = await this.prisma.correction.findUnique({
      where: { id: correctionId },
      include: { sentences: true },
    });

    if (!existingCorrection) {
      throw new NotFoundException(
        `Correction with ID ${correctionId} not found`,
      );
    }

    if (existingCorrection.created_by !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this correction',
      );
    }
  }

  private async handleSentencesUpdate(
    tx: Prisma.TransactionClient,
    updateCorrectionDto: UpdateCorrectionDto,
  ): Promise<void> {
    // Get existing sentences
    const existingSentences = await tx.correctionSentence.findMany({
      where: {
        id_correction: updateCorrectionDto.id,
      },
    });

    const existingSentenceMap = new Map(
      existingSentences.map((sentence) => [sentence.index, sentence]),
    );
    const processedIndexes = new Set<number>();

    // Process each sentence
    for (const sentenceDto of updateCorrectionDto.sentences) {
      processedIndexes.add(sentenceDto.index);
      const existingSentence = existingSentenceMap.get(sentenceDto.index);

      if (existingSentence) {
        await tx.correctionSentence.update({
          where: { id: existingSentence.id },
          data: {
            corrected_text: sentenceDto.corrected_text,
            explanation: sentenceDto.explanation,
            is_correct: sentenceDto.is_correct,
            rating: sentenceDto.rating,
          },
        });
      } else {
        await tx.correctionSentence.create({
          data: {
            id_correction: updateCorrectionDto.id,
            index: sentenceDto.index,
            original_text: sentenceDto.original_text,
            corrected_text: sentenceDto.corrected_text,
            explanation: sentenceDto.explanation,
            is_correct: sentenceDto.is_correct,
            rating: sentenceDto.rating,
          },
        });
      }
    }

    // Delete unprocessed sentences
    const indexesToDelete = existingSentences
      .filter((sentence) => !processedIndexes.has(sentence.index))
      .map((sentence) => sentence.id);

    if (indexesToDelete.length > 0) {
      await tx.correctionSentence.deleteMany({
        where: {
          id: {
            in: indexesToDelete,
          },
        },
      });
    }
  }
}