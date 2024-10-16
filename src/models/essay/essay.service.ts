import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateEssayResponseDto } from 'src/models/essay/dto/create-essay-response.dto';
import { CreateEssayDto } from 'src/models/essay/dto/create-essay.dto';
import { DeleteEssayResponseDto } from 'src/models/essay/dto/delete-space-response.dto';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { FindOneEssayResponseDto } from 'src/models/essay/dto/find-one-essay-reponse.dto';
import { UpdateEssayDto } from 'src/models/essay/dto/update-essay.dto';
import { UpdateEssayResponseDto } from 'src/models/essay/dto/update-space-response.dto';

@Injectable()
export class EssayService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createEssayDto: CreateEssayDto,
  ): Promise<CreateEssayResponseDto> {
    const { created_by, spaceId, ...data } = createEssayDto;

    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${spaceId} not found`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: created_by },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${created_by} not found`);
    }

    const essay = await this.prisma.essay.create({
      data: {
        ...data,
        author: {
          connect: { id: created_by },
        },
        space: {
          connect: { id: spaceId },
        },
      },
    });

    //increase the essay count of the space
    if (essay) {
      await this.prisma.space.update({
        where: { id: spaceId },
        data: {
          essay_number: {
            increment: 1,
          },
        },
      });
    }

    return {
      essay,
    };
  }

  async findAll(findAllEssaysDto: FindAllEssaysDto) {
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
      }),
      this.prisma.essay.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllEssaysDto);

    return {
      data: essays,
      pagination,
    };
  }

  async findOne(id: number): Promise<FindOneEssayResponseDto> {
    const essay = await this.prisma.essay.findUnique({
      where: { id },
    });

    if (!essay) {
      throw new NotFoundException(`Essay with ID ${id} not found`);
    }

    return {
      essay,
    };
  }

  async update(
    id: number,
    updateEssayDto: UpdateEssayDto,
  ): Promise<UpdateEssayResponseDto> {
    const essay = await this.prisma.essay.update({
      where: { id },
      data: updateEssayDto,
    });

    if (!essay) {
      throw new NotFoundException(`Essay with ID ${id} not found`);
    }

    return {
      essay,
    };
  }

  async delete(id: number): Promise<DeleteEssayResponseDto> {
    const essay = await this.prisma.essay.findUnique({
      where: { id },
    });

    if (!essay) {
      throw new NotFoundException(`Essay with ID ${id} not found`);
    }

    await this.prisma.essay.delete({
      where: { id },
    });

    return {
      essay,
    };
  }
}
