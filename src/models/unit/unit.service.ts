import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUnitResponseDto } from 'src/models/unit/dto/create-unit-response.dto';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitContentsResponseDto } from 'src/models/unit/dto/get-unit-contents-response.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';

// Ensure this import is correct

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUnitDto: CreateUnitDto,
    user: IAuthPayload,
  ): Promise<CreateUnitResponseDto> {
    try {
      const unit = await this.prisma.unit.create({
        data: {
          title: createUnitDto.title,
          description: createUnitDto.description,
          orderIndex: createUnitDto.orderIndex,
          course: {
            connect: { id: createUnitDto.courseId },
          },
          creator: {
            connect: { id: user.sub.toString() }, // Assuming 'sub' is the userId in IAuthPayload
          },
        },
      });

      return {
        id: unit.id,
        title: unit.title,
        description: unit.description,
        orderIndex: unit.orderIndex,
        createdAt: unit.createdAt,
        updatedAt: unit.updatedAt,
      };
    } catch (error) {
      console.error('Error in create unit:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getUnit(unitId: string, userId: string): Promise<GetUnitResponseDto> {
    try {
      // Lấy thông tin chi tiết của unit
      const unit = await this.prisma.unit.findUnique({
        where: { id: unitId },
        select: {
          id: true,
          courseId: true,
          title: true,
          description: true,
          orderIndex: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!unit) {
        throw new NotFoundException(`Unit with ID ${unitId} not found`);
      }

      // Lấy notes của user cho unit này (nếu có)
      const note = await this.prisma.note.findFirst({
        where: {
          unitId,
          createdBy: userId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          tags: true,
          isBookmarked: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return {
        unit: {
          id: unit.id,
          courseId: unit.courseId,
          title: unit.title,
          description: unit.description,
          orderIndex: unit.orderIndex,
          notes: note
            ? {
                id: note.id,
                title: note.title,
                content: note.content,
                tags: note.tags as string[],
                isBookmarked: note.isBookmarked,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
                deletedAt: note.deletedAt,
              }
            : null,
        },
      };
    } catch (error) {
      console.error('Error in getUnit:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getUnitContents(unitId: string): Promise<GetUnitContentsResponseDto[]> {
    try {
      const contents = await this.prisma.unitContent.findMany({
        where: { unitId },
        orderBy: { orderIndex: 'asc' },
        select: {
          id: true,
          unitId: true,
          title: true,
          contentType: true,
          orderIndex: true,
          isPremium: true,
          isRequired: true,
          completeWeight: true,
          isDone: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return contents;
    } catch (error) {
      console.error('Error in getUnitContents:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
