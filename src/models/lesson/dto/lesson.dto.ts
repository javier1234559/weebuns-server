import { ApiProperty } from '@nestjs/swagger';

import { ContentStatus, Prisma } from '@prisma/client';

export class LessonDto {
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
    nullable: true,
  })
  summary: string | null;

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
    enum: ContentStatus,
  })
  status: ContentStatus;

  @ApiProperty({
    type: 'string',
  })
  createdBy: string;

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

  // Relations - these will be populated when needed
  @ApiProperty({
    type: 'object',
    required: false,
  })
  unit?: any;

  @ApiProperty({
    type: 'object',
    required: false,
  })
  creator?: any;

  @ApiProperty({
    type: 'array',
    required: false,
  })
  notes?: any[];

  @ApiProperty({
    type: 'array',
    required: false,
  })
  comments?: any[];

  @ApiProperty({
    type: 'array',
    required: false,
  })
  currentInProgress?: any[];

  @ApiProperty({
    type: 'array',
    required: false,
  })
  nextInProgress?: any[];
}
