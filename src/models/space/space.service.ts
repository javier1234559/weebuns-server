import { Injectable, NotFoundException } from '@nestjs/common';

import {
  notDeletedQuery,
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { GetUserSpacesDto } from 'src/models/space/dto/get-user-space.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';

@Injectable()
export class SpaceService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly spaceIncludeQuery = {
    _count: {
      select: {
        essays: true,
        vocabularies: true,
        notes: true,
      },
    },
  };

  async create(
    createSpaceDto: CreateSpaceDto,
    created_by: IAuthPayload,
  ): Promise<FindOneSpaceResponseDto> {
    const creatorId = String(created_by.sub);

    const user = await this.prisma.user.findFirst({
      where: { id: creatorId, ...notDeletedQuery },
    });

    if (!user) throw new NotFoundException(`User ${created_by} not found`);

    const space = await this.prisma.space.create({
      data: {
        ...createSpaceDto,
        creator: { connect: { id: creatorId } },
      },
    });

    return { space };
  }

  async findAll(findAllSpacesDto: FindAllSpacesDto): Promise<SpacesResponse> {
    const { page, perPage, search } = findAllSpacesDto;

    const queryOptions = {
      where: {
        ...notDeletedQuery,
        ...searchQuery(search, ['name', 'description']),
      },
      include: this.spaceIncludeQuery,
      orderBy: { createdAt: 'desc' },
      ...paginationQuery(page, perPage),
    };

    const [spaces, totalItems] = await Promise.all([
      this.prisma.space.findMany(queryOptions),
      this.prisma.space.count({ where: queryOptions.where }),
    ]);

    return {
      data: spaces,
      pagination: calculatePagination(totalItems, findAllSpacesDto),
    };
  }

  async findOne(id: string): Promise<FindOneSpaceResponseDto> {
    const space = await this.prisma.space.findFirst({
      where: { id, ...notDeletedQuery },
      include: this.spaceIncludeQuery,
    });

    if (!space) throw new NotFoundException(`Space ${id} not found`);

    return { space };
  }

  async update(
    id: string,
    updateSpaceDto: UpdateSpaceDto,
  ): Promise<FindOneSpaceResponseDto> {
    const space = await this.prisma.space.findFirst({
      where: { id, ...notDeletedQuery },
    });

    if (!space) throw new NotFoundException(`Space ${id} not found`);

    const updated = await this.prisma.space.update({
      where: { id },
      data: updateSpaceDto,
      include: this.spaceIncludeQuery,
    });

    return {
      space: updated,
    };
  }

  async delete(id: string): Promise<DeleteSpaceResponseDto> {
    const space = await this.prisma.space.findUnique({
      where: { id, ...notDeletedQuery },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    // Soft delete instead of hard delete
    const updatedSpace = await this.prisma.space.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      space: updatedSpace,
    };
  }

  //for graphql
  async findUserSpaces(input: GetUserSpacesDto): Promise<SpacesResponse> {
    const { userId, page, perPage, search } = input;

    const queryOptions = {
      where: {
        createdBy: userId,
        ...notDeletedQuery,
        ...searchQuery(search, ['name', 'description']),
      },
      include: this.spaceIncludeQuery,
      orderBy: { createdAt: 'desc' },
      ...paginationQuery(page, perPage),
    };

    const [spaces, totalItems] = await Promise.all([
      this.prisma.space.findMany(queryOptions),
      this.prisma.space.count({ where: queryOptions.where }),
    ]);

    return {
      data: spaces,
      ...(page &&
        perPage && {
          pagination: calculatePagination(totalItems, { page, perPage }),
        }),
    };
  }
}
