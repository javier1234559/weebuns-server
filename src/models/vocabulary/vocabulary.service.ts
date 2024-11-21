import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RepetitionLevel } from 'src/common/enum/common';
import {
  notDeletedQuery,
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { FindAllVocabularyDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabularyResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';

@Injectable()
export class VocabularyService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeQuery = {
    creator: true,
    space: true,
  } as const;

  async create(
    createVocabularyDto: CreateVocabularyDto,
    @CurrentUser() currentUser: IAuthPayload,
  ): Promise<FindOneVocabularyResponseDto> {
    const { spaceId, ...data } = createVocabularyDto;
    const creatorId = String(currentUser.sub);

    const space = await this.prisma.space.findFirst({
      where: { id: spaceId, ...notDeletedQuery },
    });

    if (!space) throw new NotFoundException(`Space ${spaceId} not found`);

    const user = await this.prisma.user.findFirst({
      where: { id: creatorId, ...notDeletedQuery },
    });

    if (!user) throw new NotFoundException(`User ${creatorId} not found`);

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

  async findAll(query: FindAllVocabularyDto): Promise<VocabularyResponse> {
    const { page, perPage, search, dueDate, spaceId } = query;

    const where: Prisma.VocabularyWhereInput = {
      ...notDeletedQuery,
      ...(spaceId && { spaceId }),
      ...searchQuery(search, ['term', 'meaning']),
      ...(dueDate && {
        nextReview: {
          not: null,
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        repetitionLevel: {
          lt: RepetitionLevel.MASTERED,
        },
      }),
    };

    const [vocabularies, totalItems] = await Promise.all([
      this.prisma.vocabulary.findMany({
        where,
        orderBy: [{ nextReview: 'asc' }, { createdAt: 'desc' }],
        ...paginationQuery(page, perPage),
      }),
      this.prisma.vocabulary.count({ where }),
    ]);

    return {
      data: vocabularies,
      pagination: calculatePagination(totalItems, query),
    };
  }

  async findOne(id: string): Promise<FindOneVocabularyResponseDto> {
    const vocabulary = await this.prisma.vocabulary.findFirst({
      where: { id, ...notDeletedQuery },
      include: this.includeQuery,
    });

    if (!vocabulary) throw new NotFoundException(`Vocabulary ${id} not found`);

    return { vocabulary };
  }

  async update(
    id: string,
    updateVocabularyDto: UpdateVocabularyDto,
  ): Promise<FindOneVocabularyResponseDto> {
    const vocabulary = await this.prisma.vocabulary.findFirst({
      where: { id, ...notDeletedQuery },
    });

    if (!vocabulary) throw new NotFoundException(`Vocabulary ${id} not found`);

    const updated = await this.prisma.vocabulary.update({
      where: { id },
      data: updateVocabularyDto,
      // include: this.includeQuery,
    });

    return { vocabulary: updated };
  }

  async delete(id: string): Promise<FindOneVocabularyResponseDto> {
    const vocabulary = await this.prisma.vocabulary.findFirst({
      where: { id, ...notDeletedQuery },
    });

    if (!vocabulary) throw new NotFoundException(`Vocabulary ${id} not found`);

    const softDeletedVocabulary = await this.prisma.vocabulary.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { vocabulary: softDeletedVocabulary };
  }
}
