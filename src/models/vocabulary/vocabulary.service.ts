import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateVocabularyResponseDto } from 'src/models/vocabulary/dto/create-vocabulary-response.dto';
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { DeleteVocabularyResponseDto } from 'src/models/vocabulary/dto/delete-vocabulary-response.dto';
import { FindAllVocabulariesDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyResponseDto } from 'src/models/vocabulary/dto/update-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabulariesResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';

@Injectable()
export class VocabularyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createVocabularyDto: CreateVocabularyDto,
  ): Promise<CreateVocabularyResponseDto> {
    const { created_by, spaceId, ...data } = createVocabularyDto;

    // Kiểm tra sự tồn tại của spaceId
    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${spaceId} not found`);
    }

    // Kiểm tra sự tồn tại của created_by
    const user = await this.prisma.user.findUnique({
      where: { id: created_by },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${created_by} not found`);
    }

    const vocabulary = await this.prisma.vocabulary.create({
      data: {
        ...data,
        created_by,
        id_space: spaceId,
      },
      include: {
        creator: true,
        space: true,
      },
    });

    // Tăng số lượng từ vựng của space
    if (vocabulary) {
      await this.prisma.space.update({
        where: { id: spaceId },
        data: {
          vocab_number: {
            increment: 1,
          },
        },
      });
    }

    return {
      id: vocabulary.id,
      image_url: vocabulary.image_url,
      word: vocabulary.word,
      part_of_speech: vocabulary.part_of_speech,
      definition: vocabulary.definition,
      pronunciation: vocabulary.pronunciation,
      example: vocabulary.example,
      reference_link: vocabulary.reference_link,
      id_essay_link: vocabulary.id_essay_link,
      id_space: vocabulary.id_space,
      mastery_level: vocabulary.mastery_level,
      is_need_review: vocabulary.is_need_review,
      next_review_date: vocabulary.next_review_date,
      ease_factor: vocabulary.ease_factor,
      interval: vocabulary.interval,
      created_by: vocabulary.created_by,
      created_at: vocabulary.created_at,
      updated_at: vocabulary.updated_at,
      creator: vocabulary.creator,
      space: vocabulary.space,
      // flash_cards: vocabulary.flash_cards,
    };
  }

  async findAll(
    findAllVocabulariesDto: FindAllVocabulariesDto,
  ): Promise<VocabulariesResponse> {
    const { page, perPage, search } = findAllVocabulariesDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.VocabularyWhereInput = {};

    if (search) {
      where = {
        OR: [{ word: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [vocabularies, totalItems] = await Promise.all([
      this.prisma.vocabulary.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.vocabulary.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllVocabulariesDto);

    return {
      data: vocabularies,
      pagination,
    };
  }

  async findOne(id: number): Promise<FindOneVocabularyResponseDto> {
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
    id: number,
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
      id: vocabulary.id,
      image_url: vocabulary.image_url,
      word: vocabulary.word,
      part_of_speech: vocabulary.part_of_speech,
      definition: vocabulary.definition,
      pronunciation: vocabulary.pronunciation,
      example: vocabulary.example,
      reference_link: vocabulary.reference_link,
      id_essay_link: vocabulary.id_essay_link,
      id_space: vocabulary.id_space,
      mastery_level: vocabulary.mastery_level,
      is_need_review: vocabulary.is_need_review,
      next_review_date: vocabulary.next_review_date,
      ease_factor: vocabulary.ease_factor,
      interval: vocabulary.interval,
      created_by: vocabulary.created_by,
      created_at: vocabulary.created_at,
      updated_at: vocabulary.updated_at,
    };
  }

  async delete(id: number): Promise<DeleteVocabularyResponseDto> {
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
