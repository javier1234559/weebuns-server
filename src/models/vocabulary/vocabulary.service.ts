import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateVocabularyResponseDto } from 'src/models/vocabulary/dto/create-vocabulary-response.dto';
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { DeleteVocabularyResponseDto } from 'src/models/vocabulary/dto/delete-vocabulary-response.dto';
import { FindAllVocabularyDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyResponseDto } from 'src/models/vocabulary/dto/update-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabularyResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';

@Injectable()
export class VocabularyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createVocabularyDto: CreateVocabularyDto,
    @CurrentUser() _currentUser: IAuthPayload,
  ): Promise<CreateVocabularyResponseDto> {
    const created_id = String(_currentUser.sub);
    const { spaceId, ...data } = createVocabularyDto;

    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${spaceId} not found`);
    }

    // Kiểm tra sự tồn tại của created_by
    const user = await this.prisma.user.findUnique({
      where: { id: created_id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${created_id} not found`);
    }

    const vocabulary = await this.prisma.vocabulary.create({
      data: {
        ...data,
        createdBy: created_id,
        spaceId: spaceId,
      },
      include: {
        creator: true,
        space: true,
      },
    });

    return {
      vocabulary,
    };
  }

  async findAll(
    findAllVocabularyDto: FindAllVocabularyDto,
  ): Promise<VocabularyResponse> {
    const { page, perPage, search } = findAllVocabularyDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.VocabularyWhereInput = {};

    if (search) {
      where = {
        OR: [{ term: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [vocabulary, totalItems] = await Promise.all([
      this.prisma.vocabulary.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vocabulary.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllVocabularyDto);

    return {
      data: vocabulary,
      pagination,
    };
  }

  async findOne(id: string): Promise<FindOneVocabularyResponseDto> {
    const vocabulary = await this.prisma.vocabulary.findUnique({
      where: { id },
      include: {
        creator: true,
        space: true,
      },
    });

    if (!vocabulary) {
      throw new NotFoundException(`Vocabulary with ID ${id} not found`);
    }

    return { vocabulary };
  }

  async update(
    id: string,
    updateVocabularyDto: UpdateVocabularyDto,
  ): Promise<UpdateVocabularyResponseDto> {
    const vocabulary = await this.prisma.vocabulary.update({
      where: { id },
      data: updateVocabularyDto,
    });

    if (!vocabulary) {
      throw new NotFoundException(`Vocabulary with ID ${id} not found`);
    }

    return {
      vocabulary,
    };
  }

  async delete(id: string): Promise<DeleteVocabularyResponseDto> {
    const vocabulary = await this.prisma.vocabulary.findUnique({
      where: { id },
    });

    if (!vocabulary) {
      throw new NotFoundException(`Vocabulary with ID ${id} not found`);
    }

    await this.prisma.vocabulary.delete({
      where: { id },
    });

    return {
      message: `Vocabulary with ID ${id} has been successfully deleted.`,
    };
  }
}
