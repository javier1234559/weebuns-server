import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
import { UnitLearnResponseDto } from 'src/models/unit/dto/unit-learn.dto';
import { UpdateUnitDto } from 'src/models/unit/dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUnitDto: CreateUnitDto,
    userId: string,
  ): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.create({
      data: {
        title: createUnitDto.title,
        orderIndex: createUnitDto.orderIndex,
        isPremium: createUnitDto.isPremium ?? false,
        courseId: createUnitDto.courseId,
        createdBy: userId,
      },
    });

    return {
      unit,
    };
  }

  async getUnit(unitId: string): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.findUnique({
      where: { id: unitId },
      include: {
        lessons: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }

    return {
      unit,
    };
  }

  async getUnitForLearning(unitId: string): Promise<UnitLearnResponseDto> {
    const unit = await this.prisma.unit.findUnique({
      where: {
        id: unitId,
      },
      include: {
        lessons: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }

    return {
      unit,
    };
  }

  async update(
    unitId: string,
    updateUnitDto: UpdateUnitDto,
  ): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.update({
      where: { id: unitId },
      data: {
        title: updateUnitDto.title,
        orderIndex: updateUnitDto.orderIndex,
        isPremium: updateUnitDto.isPremium,
      },
      include: {
        lessons: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    return { unit };
  }

  async delete(unitId: string): Promise<GetUnitResponseDto> {
    const unit = await this.prisma.unit.delete({
      where: { id: unitId },
    });

    return { unit };
  }
}
