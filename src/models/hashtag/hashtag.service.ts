import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { logger } from 'src/common/utils/logger';
import { calculatePagination } from 'src/common/utils/pagination';
import { DeleteHashtagResponseDto } from 'src/models/hashtag/dto/delete-hashtag-response.dto';
import { FindAllHashtagsDto } from 'src/models/hashtag/dto/find-all-hashtags.dto';
import { HashtagsResponseDto } from 'src/models/hashtag/dto/hashtags-response.dto';

@Injectable()
export class HashtagService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    findAllHashtagsDto: FindAllHashtagsDto,
  ): Promise<HashtagsResponseDto> {
    const { page, perPage, search } = findAllHashtagsDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.HashtagWhereInput = {};

    if (search) {
      where = {
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [hashtags, totalItems] = await Promise.all([
      this.prisma.hashtag.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { essays: true },
          },
        },
      }),
      this.prisma.hashtag.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllHashtagsDto);

    return {
      data: hashtags,
      pagination,
    };
  }

  async deleteByName(name: string): Promise<DeleteHashtagResponseDto> {
    // First find the hashtag
    const hashtag = await this.prisma.hashtag.findFirst({
      where: { name },
      include: {
        _count: {
          select: {
            essays: true,
          },
        },
      },
    });

    logger.info('Hashtag found:', hashtag);
    if (!hashtag) {
      throw new NotFoundException(`Hashtag with name ${name} not found`);
    }

    // Check if hashtag has any associated essays
    if (hashtag._count.essays > 0) {
      throw new ConflictException({
        message: 'Cannot delete hashtag that is in use',
        details: `Hashtag "${name}" is currently used in ${hashtag._count.essays} essays. Please remove all essay associations before deleting.`,
      });
    }

    // Attempt to delete the hashtag
    await this.prisma.hashtag.delete({
      where: { id: hashtag.id },
    });

    return {
      hashtag,
    };
  }

  async findOrCreateHashtags(hashtagNames: string[]): Promise<string[]> {
    if (!hashtagNames?.length) return [];

    const uniqueNames = [
      ...new Set(hashtagNames.map((name) => name.toLowerCase())),
    ];

    const hashtagIds = await this.prisma.$transaction(async (tx) => {
      const results = await Promise.all(
        uniqueNames.map(async (name) => {
          // Try to find existing hashtag
          let hashtag = await tx.hashtag.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } },
          });

          // If not found, create new hashtag
          if (!hashtag) {
            hashtag = await tx.hashtag.create({
              data: { name },
            });
          }

          return hashtag.id;
        }),
      );

      return results;
    });

    return hashtagIds;
  }
}
