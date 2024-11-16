import { ApiProperty } from '@nestjs/swagger';

import { Decimal } from '@prisma/client/runtime/library';

import { LevelCode } from 'src/common/enum/common';

export class CreateCourseResponseDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string', nullable: true })
  description: string | null;

  @ApiProperty({ type: 'string', nullable: true })
  thumbnailUrl: string | null;

  @ApiProperty({ enum: LevelCode })
  level: string;

  @ApiProperty({ type: 'number', nullable: true })
  price: Decimal | null;

  @ApiProperty({ type: 'number' })
  totalWeight: number;

  @ApiProperty({ type: 'boolean' })
  isPublished: boolean;

  @ApiProperty({ type: 'string' })
  createdAt: Date;
}
