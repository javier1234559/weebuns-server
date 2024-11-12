import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

export class UnitDto {
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
    type: 'integer',
    format: 'int32',
  })
  orderIndex: number;
  @ApiProperty({
    example: '[{',
    type: () => Object,
  })
  comments: Prisma.JsonValue;
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
