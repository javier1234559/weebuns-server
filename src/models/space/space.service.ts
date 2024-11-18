import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import {
  isPublishedQuery,
  notDeletedQuery,
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { SpaceCoursesJoinedResponseDto } from 'src/models/space/dto/course-joined.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { ExploreCoursesQueryDto } from 'src/models/space/dto/explore-course-query.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { GetSpacesUserDto } from 'src/models/space/dto/get-space-user.dto';
import { GetUserSpacesDto } from 'src/models/space/dto/get-user-space.dto';
import { SpaceCoursesAllResponseDto } from 'src/models/space/dto/space-course-all-response.dto';
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
          creator: true,
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

  async getSpaceCoursesJoined(
    userId: string,
    spaceId: string,
    page: number,
    perPage: number,
  ): Promise<SpaceCoursesJoinedResponseDto> {
    const skip = (page - 1) * perPage;

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where: {
          spaces: {
            some: {
              spaceId,
            },
          },
          ...notDeletedQuery,
        },
        include: {
          creator: true,
          progress: {
            where: {
              userId,
            },
          },
        },
        skip,
        take: perPage,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.course.count({
        where: {
          spaces: {
            some: {
              spaceId,
            },
          },
          ...notDeletedQuery,
        },
      }),
    ]);

    return {
      data: courses.map((course) => ({
        ...course,
        progress: course.progress[0] || null,
      })),
      pagination: {
        totalItems: total,
        currentPage: page,
        itemsPerPage: perPage,
        totalPages: Math.ceil(total / perPage),
        hasNextPage: page * perPage < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getSpaceCourses(
    userId: string | null,
    spaceId: string,
    query: ExploreCoursesQueryDto,
  ): Promise<SpaceCoursesAllResponseDto> {
    const {
      page,
      perPage,
      search,
      language,
      minLevel,
      maxLevel,
      topics,
      courseType,
    } = query;
    const skip = (page - 1) * perPage;

    console.log(query);

    const whereClause: Prisma.CourseWhereInput = {
      ...notDeletedQuery,
      ...isPublishedQuery,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(language && { language }),
      ...(minLevel && { minLevel }),
      ...(maxLevel && { maxLevel }),
      ...(courseType && { courseType }),
      ...(topics?.length && { topics: { hasEvery: topics } }),
    };

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where: whereClause,
        include: {
          creator: true,
          spaces: {
            where: { spaceId },
            select: { joinedAt: true },
          },
          progress: userId
            ? {
                where: { userId },
                select: {
                  id: true,
                  currentUnitId: true,
                  currentUnitContentId: true,
                  completedWeight: true,
                  completedUnits: true,
                  completedContents: true,
                  lastAccessedAt: true,
                  currentUnit: true,
                },
              }
            : false,
        },
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.course.count({ where: whereClause }),
    ]);

    const transformedCourses = courses.map((course) => ({
      ...course,
      isJoined: !!course.spaces[0],
      joinedAt: course.spaces[0]?.joinedAt || null,
      spaces: undefined,
      progress: course.progress?.[0] || null,
    }));

    return {
      data: transformedCourses,
      pagination: {
        totalItems: total,
        currentPage: page,
        itemsPerPage: perPage,
        totalPages: Math.ceil(total / perPage),
        hasNextPage: page * perPage < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  // async getSpaceCourses(
  //   userId: string | null,
  //   spaceId: string,
  //   page: number,
  //   perPage: number,
  // ): Promise<SpaceCoursesAllResponseDto> {
  //   const skip = (page - 1) * perPage;

  //   const [courses, total] = await Promise.all([
  //     this.prisma.course.findMany({
  //       where: {
  //         ...notDeletedQuery,
  //         ...isPublishedQuery,
  //       },
  //       include: {
  //         // Creator information
  //         creator: true,
  //         // Check if course is joined
  //         spaces: {
  //           where: {
  //             spaceId,
  //           },
  //           select: {
  //             joinedAt: true,
  //           },
  //         },
  //         // Updated: Course progress with new schema
  //         progress: userId
  //           ? {
  //               where: {
  //                 userId,
  //               },
  //               select: {
  //                 id: true,
  //                 currentUnitId: true,
  //                 currentUnitContentId: true,
  //                 completedWeight: true,
  //                 completedUnits: true,
  //                 completedContents: true,
  //                 lastAccessedAt: true,
  //                 currentUnit: true,
  //               },
  //             }
  //           : false,
  //       },
  //       skip,
  //       take: perPage,
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     }),

  //     this.prisma.course.count({
  //       where: {
  //         ...notDeletedQuery,
  //         ...isPublishedQuery,
  //       },
  //     }),
  //   ]);

  //   // Transform data with updated progress structure

  //   console.log(courses);

  //   const transformedCourses = courses.map((course) => {
  //     const spaceConnection = course.spaces[0];

  //     return {
  //       ...course,
  //       isJoined: !!spaceConnection,
  //       joinedAt: spaceConnection?.joinedAt || null,
  //       spaces: undefined,
  //       // Updated: Get first progress record with new structure
  //       progress: course.progress?.[0] || null,
  //     };
  //   });

  //   return {
  //     data: transformedCourses,
  //     pagination: {
  //       totalItems: total,
  //       currentPage: page,
  //       itemsPerPage: perPage,
  //       totalPages: Math.ceil(total / perPage),
  //       hasNextPage: page * perPage < total,
  //       hasPreviousPage: page > 1,
  //     },
  //   };
  // }

  // async getSpaceCourses(
  //   spaceId: string,
  //   page: number,
  //   perPage: number,
  // ): Promise<SpaceCoursesResponseDto> {
  //   const skip = (page - 1) * perPage;

  //   const [courses, total] = await Promise.all([
  //     this.prisma.$queryRaw<CourseRawResult[]>`
  //       SELECT
  //         c.id,
  //         c.title,
  //         c.description,
  //         c.thumbnail_url AS "thumbnailUrl",
  //         c.level,
  //         c.price,
  //         c.total_weight AS "totalWeight",
  //         c.is_published AS "isPublished",
  //         c.created_at AS "createdAt",
  //         u.id AS "creatorId",
  //         u.username,
  //         u.profile_picture AS "profilePicture",
  //         sc.joined_at AS "joinedAt",
  //         CASE WHEN sc.course_id IS NOT NULL THEN true ELSE false END AS "isJoined"
  //       FROM courses c
  //       LEFT JOIN space_courses sc ON c.id = sc.course_id AND sc.space_id = ${spaceId}
  //       LEFT JOIN users u ON c.created_by = u.id
  //       WHERE c.is_published = true
  //       ORDER BY c.created_at DESC
  //       LIMIT ${perPage} OFFSET ${skip}
  //     `,
  //     this.prisma.course.count({
  //       where: {
  //         isPublished: true,
  //       },
  //     }),
  //   ]);

  //   const totalPages = Math.ceil(total / perPage);

  //   return {
  //     data: courses.map((course) => ({
  //       id: course.id,
  //       title: course.title,
  //       description: course.description,
  //       thumbnailUrl: course.thumbnailUrl,
  //       level: course.level,
  //       price: course.price,
  //       totalWeight: course.totalWeight,
  //       isPublished: course.isPublished,
  //       createdAt: course.createdAt,
  //       creator: {
  //         id: course.creatorId,
  //         username: course.username,
  //         profilePicture: course.profilePicture,
  //       },
  //       is_joined: course.isJoined,
  //       joined_at: course.joinedAt,
  //     })),
  //     pagination: {
  //       totalItems: total,
  //       currentPage: page,
  //       totalPages,
  //       itemsPerPage: perPage,
  //       hasNextPage: page * perPage < total,
  //       hasPreviousPage: page > 1,
  //     },
  //   };
  // }
}
