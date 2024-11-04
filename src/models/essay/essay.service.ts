import { Injectable, NotFoundException } from '@nestjs/common';

import { EssayStatus, Prisma } from '@prisma/client';

import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { logger } from 'src/common/utils/logger';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateEssayResponseDto } from 'src/models/essay/dto/create-essay-response.dto';
import { CreateEssayDto } from 'src/models/essay/dto/create-essay.dto';
import { DeleteEssayResponseDto } from 'src/models/essay/dto/delete-space-response.dto';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { FindOneEssayResponseDto } from 'src/models/essay/dto/find-one-essay-reponse.dto';
import { UpdateEssayDto } from 'src/models/essay/dto/update-essay.dto';
import { UpdateEssayResponseDto } from 'src/models/essay/dto/update-space-response.dto';
import { HashtagService } from 'src/models/hashtag/hashtag.service';

@Injectable()
export class EssayService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashTagService: HashtagService,
  ) {}

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

  async findAllByUser(
    query: FindAllEssaysDto,
    user: IAuthPayload,
  ): Promise<EssaysResponse> {
    const { page, perPage, search, status } = query;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.EssayWhereInput = {
      created_by: String(user.sub), // Use user ID from auth token
    };

    if (search) {
      where = {
        ...where,
        OR: [{ title: { contains: search, mode: 'insensitive' } }],
      };
    }

    if (status) {
      where = {
        ...where,
        status,
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

    const pagination = calculatePagination(totalItems, query);

    return {
      data: essays,
      pagination,
    };
  }

  async create(
    tx: Prisma.TransactionClient,
    createEssayDto: CreateEssayDto,
    user: IAuthPayload,
  ): Promise<CreateEssayResponseDto> {
    const { spaceId, hashtag_names, ...data } = createEssayDto;
    logger.info('hashtagIds', hashtag_names);

    const hashtagIds = hashtag_names?.length
      ? await this.hashTagService.findOrCreateHashtags(hashtag_names)
      : [];

    logger.info('hashtagIds', hashtagIds);

    const essay = await tx.essay.create({
      data: {
        ...data,
        author: {
          connect: { id: String(user.sub) },
        },
        space: {
          connect: { id: spaceId },
        },
        hashtags: {
          create: hashtagIds.map((hashtagId) => ({
            hashtag: {
              connect: { id: hashtagId },
            },
          })),
        },
      },
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
    const { page, perPage, search, status } = findAllEssaysDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.EssayWhereInput = {};

    if (search) {
      where = {
        OR: [{ title: { contains: search, mode: 'insensitive' } }],
      };
    }
    console.log(status);
    if (status) {
      where = {
        ...where,
        status,
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
        hashtags: {
          include: {
            hashtag: true,
          },
        },
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
    tx: Prisma.TransactionClient,
    id: string,
    updateEssayDto: UpdateEssayDto,
    user: IAuthPayload,
  ): Promise<UpdateEssayResponseDto> {
    // First check if the essay belongs to the user
    const existingEssay = await tx.essay.findFirst({
      where: {
        id,
        created_by: String(user.sub),
      },
    });

    if (!existingEssay) {
      throw new NotFoundException(
        `Essay with ID ${id} not found or you don't have permission to update it`,
      );
    }

    const { hashtag_names, ...updateData } = updateEssayDto;

    const hashtagIds = hashtag_names?.length
      ? await this.hashTagService.findOrCreateHashtags(hashtag_names)
      : null;

    const essay = await tx.essay.update({
      where: { id },
      data: {
        ...updateData,
        ...(hashtagIds && {
          hashtags: {
            deleteMany: {},
            create: hashtagIds.map((hashtagId) => ({
              hashtag: {
                connect: { id: hashtagId },
              },
            })),
          },
        }),
      },
      include: this.defaultInclude,
    });

    return {
      essay,
    };
  }

  async delete(id: string): Promise<DeleteEssayResponseDto> {
    return await this.prisma.$transaction(async (tx) => {
      const essay = await tx.essay.findUnique({
        where: { id },
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

  async deleteByUser(id: string): Promise<DeleteEssayResponseDto> {
    return await this.prisma.$transaction(async (tx) => {
      const essay = await tx.essay.findUnique({
        where: { id },
      });

      if (!essay) {
        throw new NotFoundException(`Essay with ID ${id} not found`);
      }

      // Soft Delete the essay
      await tx.essay.update({
        where: { id },
        data: {
          status: EssayStatus.deleted,
        },
      });

      return { essay };
    });
  }
}
