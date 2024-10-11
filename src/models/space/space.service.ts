import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Space } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-space.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';

@Injectable()
export class SpaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpaceDto: CreateSpaceDto): Promise<Space> {
    const { userId, ...data } = createSpaceDto;

    // Kiểm tra sự tồn tại của userId
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
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
    return space;
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
  async findOne(id: number): Promise<Space> {
    const space = await this.prisma.space.findUnique({
      where: { id: id }, // Đảm bảo id là số nguyên
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return space;
  }

  async update(id: number, updateSpaceDto: UpdateSpaceDto): Promise<Space> {
    const space = await this.prisma.space.findUnique({
      where: { id },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return this.prisma.space.update({
      where: { id },
      data: updateSpaceDto,
    });
  }

  async delete(id: number): Promise<Space> {
    const space = await this.prisma.space.findUnique({
      where: { id },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return this.prisma.space.delete({
      where: { id },
    });
  }
}
