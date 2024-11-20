import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUnitContentDto } from 'src/models/unit-content/dto/create-unit-content.dto';
import { GetUnitContentResponseDto } from 'src/models/unit-content/dto/get-unit-content-response.dto';
import { UnitContentResponseDto } from 'src/models/unit-content/dto/unit-content-response.dto';
import { UpdateUnitContentDto } from 'src/models/unit-content/dto/update-unit-content.dto';

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
        contentWeight: createUnitContentDto.completeWeight,
      },
    });

    return {
      unitContent,
    };
  }

  async findOne(
    unitId: string,
    contentId: string,
  ): Promise<UnitContentResponseDto> {
    const content = await this.prisma.unitContent.findFirst({
      where: {
        id: contentId,
        unitId,
      },
    });

    if (!content) {
      throw new NotFoundException(
        `Content ${contentId} not found in unit ${unitId}`,
      );
    }

    return { unitContent: content };
  }

  async create(
    unitId: string,
    dto: CreateUnitContentDto,
  ): Promise<UnitContentResponseDto> {
    const unit = await this.prisma.unit.findUnique({ where: { id: unitId } });
    if (!unit) throw new NotFoundException(`Unit ${unitId} not found`);

    const content = await this.prisma.unitContent.create({
      data: {
        ...dto,
        unitId,
      },
    });

    return { unitContent: content };
  }

  async update(
    unitId: string,
    contentId: string,
    dto: UpdateUnitContentDto,
  ): Promise<UnitContentResponseDto> {
    const content = await this.prisma.unitContent.findFirst({
      where: {
        id: contentId,
        unitId,
      },
    });

    if (!content) {
      throw new NotFoundException(
        `Content ${contentId} not found in unit ${unitId}`,
      );
    }

    const updated = await this.prisma.unitContent.update({
      where: { id: contentId },
      data: dto,
    });

    return { unitContent: updated };
  }

  async delete(
    unitId: string,
    contentId: string,
  ): Promise<UnitContentResponseDto> {
    const content = await this.prisma.unitContent.findFirst({
      where: {
        id: contentId,
        unitId,
      },
    });

    if (!content) {
      throw new NotFoundException(
        `Content ${contentId} not found in unit ${unitId}`,
      );
    }

    const deleted = await this.prisma.unitContent.delete({
      where: { id: contentId },
    });

    return { unitContent: deleted };
  }
}
