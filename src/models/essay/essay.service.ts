import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import {
  notDeletedQuery,
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
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

    const queryOptions = {
      where: {
        createdBy: String(user.sub),
        ...notDeletedQuery,
        ...searchQuery(search, ['title', 'summary']),
        ...(status && { status }),
      },
      include: this.defaultInclude,
      orderBy: { createdAt: 'desc' },
      ...paginationQuery(page, perPage),
    };

    const [essays, totalItems] = await Promise.all([
      this.prisma.essay.findMany(queryOptions),
      this.prisma.essay.count({ where: queryOptions.where }),
    ]);

    return {
      data: essays,
      pagination: calculatePagination(totalItems, query),
    };
  }

  async create(
    tx: Prisma.TransactionClient,
    createEssayDto: CreateEssayDto,
    user: IAuthPayload,
  ): Promise<CreateEssayResponseDto> {
    const { spaceId, hashtag_names, ...data } = createEssayDto;

    const hashtagIds = hashtag_names?.length
      ? await this.hashTagService.findOrCreateHashtags(hashtag_names)
      : [];

    const essay = await tx.essay.create({
      data: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        coverUrl: data.cover_url,
        status: data.status,
        language: data.language,
        upvoteCount: 0,
        author: { connect: { id: String(user.sub) } },
        space: { connect: { id: spaceId } },
        hashtags: {
          create: hashtagIds.map((hashtagId) => ({
            hashtag: { connect: { id: hashtagId } },
          })),
        },
      },
      include: this.defaultInclude,
    });

    return this.mapEssayResponse(essay);
  }

  async findAll(query: FindAllEssaysDto): Promise<EssaysResponse> {
    const { page, perPage, search, status } = query;

    const queryOptions = {
      where: {
        ...notDeletedQuery,
        ...searchQuery(search, ['title', 'summary']),
        ...(status && { status }),
      },
      include: this.defaultInclude,
      orderBy: { createdAt: 'desc' },
      ...paginationQuery(page, perPage),
    };

    const [essays, totalItems] = await Promise.all([
      this.prisma.essay.findMany(queryOptions),
      this.prisma.essay.count({ where: queryOptions.where }),
    ]);

    return {
      data: essays,
      pagination: calculatePagination(totalItems, query),
    };
  }

  async findOne(id: string): Promise<FindOneEssayResponseDto> {
    const essay = await this.prisma.essay.findFirst({
      where: { id, ...notDeletedQuery },
      include: this.defaultInclude,
    });

    if (!essay) throw new NotFoundException(`Essay ${id} not found`);

    return { essay };
  }

  async update(
    tx: Prisma.TransactionClient,
    id: string,
    updateEssayDto: UpdateEssayDto,
    user: IAuthPayload,
  ): Promise<UpdateEssayResponseDto> {
    const essay = await tx.essay.findFirst({
      where: {
        id,
        createdBy: String(user.sub),
        ...notDeletedQuery,
      },
    });

    if (!essay)
      throw new NotFoundException(`Essay ${id} not found or unauthorized`);

    const { hashtag_names, ...updateData } = updateEssayDto;

    const hashtagIds = hashtag_names?.length
      ? await this.hashTagService.findOrCreateHashtags(hashtag_names)
      : null;

    const updated = await tx.essay.update({
      where: { id },
      data: {
        ...updateData,
        ...(hashtagIds && {
          hashtags: {
            deleteMany: {},
            create: hashtagIds.map((hashtagId) => ({
              hashtag: { connect: { id: hashtagId } },
            })),
          },
        }),
      },
      include: this.defaultInclude,
    });

    return { essay: updated };
  }

  async deleteByUser(id: string): Promise<DeleteEssayResponseDto> {
    return await this.prisma.$transaction(async (tx) => {
      const essay = await tx.essay.findFirst({
        where: { id, ...notDeletedQuery },
      });

      if (!essay) throw new NotFoundException(`Essay ${id} not found`);

      const deleted = await tx.essay.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      return { essay: deleted };
    });
  }

  async delete(id: string): Promise<DeleteEssayResponseDto> {
    return await this.prisma.$transaction(async (tx) => {
      const essay = await tx.essay.findFirst({
        where: { id },
      });

      if (!essay) throw new NotFoundException(`Essay ${id} not found`);

      const deleted = await tx.essay.delete({
        where: { id },
      });

      return { essay: deleted };
    });
  }

  private mapEssayResponse(essay: any): CreateEssayResponseDto {
    return {
      id: essay.id,
      id_space: essay.spaceId,
      title: essay.title,
      summary: essay.summary,
      upvote_count: essay.upvoteCount,
      content: essay.content,
      cover_url: essay.coverUrl,
      status: essay.status,
      language: essay.language,
      hashtags: essay.hashtags,
      author: essay.author,
    };
  }
}
