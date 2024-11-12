import { ApiProperty } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';

export class EssayDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  upvoteCount: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  summary: string | null;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  coverUrl: string | null;
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
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deletedAt: Date | null;
}
