import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUnitContentResponseDto } from 'src/models/unit-content/dto/create-unit-content-response.dto';
import { CreateUnitContentDto } from 'src/models/unit-content/dto/create-unit-content.dto';
import { GetUnitContentDetailResponseDto } from 'src/models/unit-content/dto/get-unit-content-detail-response.dto';

@Injectable()
export class UnitContentService {
  constructor(private readonly prisma: PrismaService) {}

  async createUnitContent(
    unitId: string,
    createUnitContentDto: CreateUnitContentDto,
  ): Promise<CreateUnitContentResponseDto> {
    try {
      const unitContent = await this.prisma.unitContent.create({
        data: {
          unitId,
          title: createUnitContentDto.title,
          contentType: createUnitContentDto.contentType,
          content: createUnitContentDto.content,
          orderIndex: createUnitContentDto.orderIndex,
          isPremium: false, // Default value, can be updated as needed
          isRequired: true, // Default value, can be updated as needed
          completeWeight: 1, // Default value, can be updated as needed
          isDone: false, // Default value, can be updated as needed
        },
      });

      return {
        id: unitContent.id,
        unitId: unitContent.unitId,
        title: unitContent.title,
        contentType: unitContent.contentType,
        content: unitContent.content,
        orderIndex: unitContent.orderIndex,
        isPremium: unitContent.isPremium,
        isRequired: unitContent.isRequired,
        completeWeight: unitContent.completeWeight,
        isDone: unitContent.isDone,
        createdAt: unitContent.createdAt,
        updatedAt: unitContent.updatedAt,
      };
    } catch (error) {
      console.error('Error in createUnitContent:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getUnitContentDetail(
    contentId: string,
  ): Promise<GetUnitContentDetailResponseDto> {
    try {
      const content = await this.prisma.unitContent.findUnique({
        where: { id: contentId },
        select: {
          id: true,
          unitId: true,
          title: true,
          contentType: true,
          content: true,
          orderIndex: true,
          isPremium: true,
          isRequired: true,
          completeWeight: true,
          isDone: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!content) {
        throw new NotFoundException(`Content with ID ${contentId} not found`);
      }

      return content;
    } catch (error) {
      console.error('Error in getUnitContentDetail:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
