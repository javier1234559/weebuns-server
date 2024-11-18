import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { IUnitContent } from 'src/models/unit-content/unit-content.interface';
import { Unit } from 'src/models/unit/entities/unit.entity';

export class UnitContent implements IUnitContent {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  unitId: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  contentType: string;
  @ApiProperty({
    type: () => Object,
  })
  content: Prisma.JsonValue;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  orderIndex: number;
  @ApiProperty({
    type: 'boolean',
  })
  isPremium: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  isRequired: boolean;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  contentWeight: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: () => Unit,
    required: false,
  })
  unit?: Unit;
  @ApiProperty({
    type: () => CourseProgress,
    isArray: true,
    required: false,
  })
  currentInProgress?: CourseProgress[];
  @ApiProperty({
    type: () => CourseProgress,
    isArray: true,
    required: false,
  })
  nextInProgress?: CourseProgress[];
}
