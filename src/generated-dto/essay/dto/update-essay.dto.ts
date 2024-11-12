import { ApiProperty } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';

export class UpdateEssayDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  title?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  summary?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  content?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  coverUrl?: string | null;
  @ApiProperty({
    enum: EssayStatus,
    required: false,
  })
  status?: EssayStatus;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  language?: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  deletedAt?: Date | null;
}
