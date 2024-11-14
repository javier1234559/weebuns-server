import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { LevelCode } from 'src/common/enum/common';

export class CreateCourseDto {
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  thumbnailUrl?: string | null;
  @ApiProperty({
    enum: LevelCode,
  })
  level: string;
  @ApiProperty({
    type: 'number',
    format: 'double',
    required: false,
    nullable: true,
  })
  price?: Prisma.Decimal | null;
}
