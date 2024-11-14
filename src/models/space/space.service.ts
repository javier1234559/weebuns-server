import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateSpaceResponseDto } from 'src/models/space/dto/create-space-response.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { GetSpacesUserDto } from 'src/models/space/dto/get-space-user.dto';
import { GetUserSpacesDto } from 'src/models/space/dto/get-user-space.dto';
import { SpaceCoursesResponseDto } from 'src/models/space/dto/space-courses-response.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { UpdateSpaceResponseDto } from 'src/models/space/dto/update-space-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
import { CourseRawResult } from 'src/models/space/interface/course-raw-result.interface';

@Injectable()
export class SpaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSpaceDto: CreateSpaceDto,
    created_by: IAuthPayload,
  ): Promise<CreateSpaceResponseDto> {
    const creatorId = String(created_by.sub);
    const user = await this.prisma.user.findUnique({
      where: { id: creatorId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${created_by} not found`);
    }

    const space = await this.prisma.space.create({
      data: {
        ...createSpaceDto,
        creator: {
          connect: { id: creatorId },
        },
      },
    });

    return {
      id: space.id,
      name: space.name,
      description: space.description,
      essay_number: 0,
      notes_number: 0,
      vocab_number: 0,
    };
  }

  async findAll(findAllSpacesDto: FindAllSpacesDto): Promise<SpacesResponse> {
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
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              essays: true,
              vocabularies: true,
              notes: true,
            },
          },
        },
      }),
      this.prisma.space.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllSpacesDto);

    return {
      data: spaces,
      pagination,
    };
  }

  async findOne(id: string): Promise<FindOneSpaceResponseDto> {
    const space = await this.prisma.space.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            essays: true,
            vocabularies: true,
            notes: true,
          },
        },
      },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return {
      space,
    };
  }

  async update(
    id: string,
    updateSpaceDto: UpdateSpaceDto,
  ): Promise<UpdateSpaceResponseDto> {
    const space = await this.prisma.space.update({
      where: { id },
      include: {
        _count: {
          select: {
            essays: true,
            vocabularies: true,
            notes: true,
          },
        },
      },
      data: updateSpaceDto,
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return {
      id: space.id,
      name: space.name,
      description: space.description,
      essay_number: space._count.essays,
      notes_number: space._count.notes,
      vocab_number: space._count.vocabularies,
    };
  }

  async delete(id: string): Promise<DeleteSpaceResponseDto> {
    const space = await this.prisma.space.findUnique({
      where: { id },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    await this.prisma.space.delete({
      where: { id },
    });

    return {
      space,
    };
  }

  //for graphql
  async findUserSpaces(input: GetUserSpacesDto): Promise<SpacesResponse> {
    const { userId, page, perPage, search } = input;
    const isPaginated = page !== undefined && perPage !== undefined;

    let where: Prisma.SpaceWhereInput = {
      createdBy: userId,
    };

    if (search) {
      where = {
        ...where,
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      };
    }

    const queryOptions: Prisma.SpaceFindManyArgs = {
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            essays: true,
            vocabularies: true,
            notes: true,
          },
        },
      },
    };

    // Add pagination options if both page and perPage are provided
    if (isPaginated) {
      queryOptions.skip = (page! - 1) * perPage!;
      queryOptions.take = perPage;
    }

    const [spaces, totalItems] = await Promise.all([
      this.prisma.space.findMany(queryOptions),
      this.prisma.space.count({ where }),
    ]);

    const response: SpacesResponse = {
      data: spaces,
    };

    // Only include pagination info if pagination parameters were provided
    if (isPaginated) {
      response.pagination = calculatePagination(totalItems, {
        page: page!,
        perPage: perPage!,
      });
    }

    return response;
  }

  async getSpacesUser(
    userId: string,
    query: GetSpacesUserDto,
  ): Promise<SpacesResponse> {
    const { page, perPage, search } = query;
    const skip = (page - 1) * perPage;

    const where: Prisma.SpaceWhereInput = {
      createdBy: userId,
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
    };

    const [spaces, totalItems] = await Promise.all([
      this.prisma.space.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              profilePicture: true,
            },
          },
        },
      }),
      this.prisma.space.count({ where }),
    ]);

    const pagination = {
      totalItems: totalItems,
      currentPage: page,
      itemsPerPage: perPage,
      totalPages: Math.ceil(totalItems / perPage),
      hasNextPage: page * perPage < totalItems,
      hasPreviousPage: page > 1,
    };

    return {
      data: spaces,
      pagination,
    };
  }

  async getSpaceCourses(
    spaceId: string,
    page: number,
    perPage: number,
  ): Promise<SpaceCoursesResponseDto> {
    const skip = (page - 1) * perPage;

    const [courses, total] = await Promise.all([
      this.prisma.$queryRaw<CourseRawResult[]>`
        SELECT
          c.id,
          c.title,
          c.description,
          c.thumbnail_url AS "thumbnailUrl",
          c.level,
          c.price,
          c.total_weight AS "totalWeight",
          c.is_published AS "isPublished",
          c.created_at AS "createdAt",
          u.id AS "creatorId",
          u.username,
          u.profile_picture AS "profilePicture",
          sc.joined_at AS "joinedAt",
          CASE WHEN sc.course_id IS NOT NULL THEN true ELSE false END AS "isJoined"
        FROM courses c
        LEFT JOIN space_courses sc ON c.id = sc.course_id AND sc.space_id = ${spaceId}
        LEFT JOIN users u ON c.created_by = u.id
        WHERE c.is_published = true
        ORDER BY c.created_at DESC
        LIMIT ${perPage} OFFSET ${skip}
      `,
      this.prisma.course.count({
        where: {
          isPublished: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / perPage);

    return {
      data: courses.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        level: course.level,
        price: course.price,
        totalWeight: course.totalWeight,
        isPublished: course.isPublished,
        createdAt: course.createdAt,
        creator: {
          id: course.creatorId,
          username: course.username,
          profilePicture: course.profilePicture,
        },
        is_joined: course.isJoined,
        joined_at: course.joinedAt,
      })),
      pagination: {
        total,
        page,
        perPage,
        totalPages,
      },
    };
  }
}
