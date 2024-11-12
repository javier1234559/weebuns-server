import { ApiProperty } from '@nestjs/swagger';

import { Prisma, ProficiencyLevel } from '@prisma/client';

export class CourseDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  thumbnailUrl: string | null;
  @ApiProperty({
    enum: ProficiencyLevel,
  })
  level: ProficiencyLevel;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  price: Prisma.Decimal;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  totalWeight: number;
  @ApiProperty({
    type: 'boolean',
  })
  isPublished: boolean;
  @ApiProperty({
    example: '[{',
    type: () => Object,
  })
  reviews: Prisma.JsonValue;
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
}
