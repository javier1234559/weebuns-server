import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateEssayResponseDto } from 'src/models/essay/dto/create-essay-response.dto';
import { CreateEssayDto } from 'src/models/essay/dto/create-essay.dto';
import { DeleteEssayResponseDto } from 'src/models/essay/dto/delete-space-response.dto';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { FindOneEssayResponseDto } from 'src/models/essay/dto/find-one-essay-reponse.dto';
import { UpdateEssayDto } from 'src/models/essay/dto/update-essay.dto';
import { UpdateEssayResponseDto } from 'src/models/essay/dto/update-space-response.dto';

@Injectable()
export class EssayService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly defaultInclude = {
    author: true,
    hashtags: {
      include: {
        hashtag: true,
      },
    },
    _count: {
      select: { corrections: true },
    },
  } as const;

  async create(
    createEssayDto: CreateEssayDto,
  ): Promise<CreateEssayResponseDto> {
    const { created_by, spaceId, hashtag_ids, ...data } = createEssayDto;

    const essay = await this.prisma.essay.create({
      data: {
        ...data,
        author: {
          connect: { id: created_by },
        },
        space: {
          connect: { id: spaceId },
        },
        // Create hashtag connections if hashtag_ids exist
        ...(hashtag_ids?.length && {
          hashtags: {
            create: hashtag_ids.map((hashtag_id) => ({
              hashtag: {
                connect: { id: hashtag_id },
              },
            })),
          },
        }),
      },
      // Include related data in response
      include: this.defaultInclude,
    });

    return {
      id: essay.id,
      id_space: essay.id_space,
      title: essay.title,
      summary: essay.summary,
      upvote_count: essay.upvote_count,
      content: essay.content,
      cover_url: essay.cover_url,
      status: essay.status,
      language: essay.language,
      hashtags: essay.hashtags,
      author: essay.author,
    };
  }

  async findAll(findAllEssaysDto: FindAllEssaysDto): Promise<EssaysResponse> {
    const { page, perPage, search } = findAllEssaysDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.EssayWhereInput = {};

    if (search) {
      where = {
        OR: [{ title: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [essays, totalItems] = await Promise.all([
      this.prisma.essay.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
        include: this.defaultInclude,
      }),
      this.prisma.essay.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllEssaysDto);

    return {
      data: essays,
      pagination,
    };
  }

  async findOne(id: string): Promise<FindOneEssayResponseDto> {
    const essay = await this.prisma.essay.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!essay) {
      throw new NotFoundException(`Essay with ID ${id} not found`);
    }

    return {
      essay,
    };
  }

  async update(
    id: string,
    updateEssayDto: UpdateEssayDto,
  ): Promise<UpdateEssayResponseDto> {
    const { hashtag_ids, ...updateData } = updateEssayDto;

    const essay = await this.prisma.essay.update({
      where: { id },
      // Create hashtag connections if hashtag_ids exist
      data: {
        ...updateData,
        ...(hashtag_ids?.length && {
          hashtags: {
            deleteMany: {}, // Remove existing connections
            create: hashtag_ids?.map((hashtag_id) => ({
              hashtag: {
                connect: { id: hashtag_id },
              },
            })),
          },
        }),
      },
    });

    if (!essay) {
      throw new NotFoundException(`Essay with ID ${id} not found`);
    }

    return {
      essay,
    };
  }

  async delete(id: string): Promise<DeleteEssayResponseDto> {
    return await this.prisma.$transaction(async (tx) => {
      // Get the essay with its relations
      const essay = await tx.essay.findUnique({
        where: { id },
        include: this.defaultInclude,
      });

      if (!essay) {
        throw new NotFoundException(`Essay with ID ${id} not found`);
      }

      // Delete the essay
      await tx.essay.delete({
        where: { id },
      });

      return { essay };
    });
  }
}
