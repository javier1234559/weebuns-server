import { ApiProperty } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';

export class CreateEssayDto {
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  summary?: string | null;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  coverUrl?: string | null;
  @ApiProperty({
    enum: EssayStatus,
  })
  status: EssayStatus;
  @ApiProperty({
    type: 'string',
  })
  language: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  deletedAt?: Date | null;
}
