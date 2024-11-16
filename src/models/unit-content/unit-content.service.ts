import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUnitContentDto } from 'src/models/unit-content/dto/create-unit-content.dto';
import { GetUnitContentResponseDto } from 'src/models/unit-content/dto/get-unit-content-response.dto';

@Injectable()
export class UnitContentService {
  constructor(private readonly prisma: PrismaService) {}

  async createUnitContent(
    unitId: string,
    createUnitContentDto: CreateUnitContentDto,
  ): Promise<GetUnitContentResponseDto> {
    const unitContent = await this.prisma.unitContent.create({
      data: {
        unitId,
        title: createUnitContentDto.title,
        contentType: createUnitContentDto.contentType,
        content: createUnitContentDto.content,
        orderIndex: createUnitContentDto.orderIndex,
        isPremium: createUnitContentDto.isPremium,
        isRequired: createUnitContentDto.isRequired,
        completeWeight: createUnitContentDto.completeWeight,
      },
    });

    return {
      unitContent,
    };
  }

  async getUnitContentDetail(
    contentId: string,
    userId: string | undefined,
  ): Promise<GetUnitContentResponseDto> {
    const unitContent = await this.prisma.unitContent.findUnique({
      where: {
        id: contentId,
      },
      include: {
        progress: {
          where: {
            unitProgress: {
              courseProgress: {
                userId: userId,
              },
            },
          },
          take: 1, // Vì chỉ có 1 progress cho mỗi user
          select: {
            id: true,
            isCompleted: true,
            unitContentId: true,
            unitProgressId: true,
            completedAt: true,
          },
        },
      },
    });

    if (!unitContent) {
      throw new NotFoundException(`Content with ID ${contentId} not found`);
    }

    return {
      unitContent,
    };
  }
}
