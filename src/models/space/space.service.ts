import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateSpaceResponseDto } from 'src/models/space/dto/create-space-response.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { UpdateSpaceResponseDto } from 'src/models/space/dto/update-space-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';

@Injectable()
export class SpaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSpaceDto: CreateSpaceDto,
  ): Promise<CreateSpaceResponseDto> {
    const { userId, ...data } = createSpaceDto;

    // Kiểm tra sự tồn tại của userId
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const space = await this.prisma.space.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    });

    // Trả về thông tin của space vừa được tạo và thông tin người dùng
    return {
      id: space.id.toString(),
      name: space.name,
      description: space.description,
      essay_number: space.essay_number,
      quiz_number: space.quiz_number,
      vocab_number: space.vocab_number,
      user,
    };
  }

  async findAll(findAllSpacesDto: FindAllSpacesDto) {
    const { page, perPage, search } = findAllSpacesDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.SpaceWhereInput = {};

    if (search) {
      where = {
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [spaces, totalItems] = await Promise.all([
      this.prisma.space.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.space.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllSpacesDto);

    return {
      data: spaces,
      pagination,
    };
  }
  async findOne(id: number): Promise<FindOneSpaceResponseDto> {
    const space = await this.prisma.space.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return {
      space,
      user: space.user,
    };
  }

  async update(
    id: number,
    updateSpaceDto: UpdateSpaceDto,
  ): Promise<UpdateSpaceResponseDto> {
    const space = await this.prisma.space.update({
      where: { id },
      data: updateSpaceDto,
      include: {
        user: true,
      },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return {
      id: space.id.toString(),
      name: space.name,
      description: space.description,
      essay_number: space.essay_number,
      quiz_number: space.quiz_number,
      vocab_number: space.vocab_number,
      user: space.user,
    };
  }

  async delete(id: number): Promise<DeleteSpaceResponseDto> {
    const space = await this.prisma.space.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    await this.prisma.space.delete({
      where: { id },
    });

    return {
      space,
      user: space.user,
    };
  }
}
