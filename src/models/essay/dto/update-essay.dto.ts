import { ApiPropertyOptional } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateEssayDto {
  @ApiPropertyOptional({
    example: 'Updated: My Journey Learning English',
    minLength: 1,
    maxLength: 255,
  })
  title?: string;

  @ApiPropertyOptional({
    example: 'Updated summary of my language learning experience',
    nullable: true,
  })
  summary?: string;

  @ApiPropertyOptional({
    example: 'Updated content: Lorem ipsum dolor sit amet...',
    minLength: 1,
  })
  content?: string;

  @ApiPropertyOptional({
    example: 42,
    minimum: 0,
  })
  upvote_count: number;

  @ApiPropertyOptional({
    example: 'https://example.com/images/updated-cover-123.jpg',
    nullable: true,
    pattern: '^https?://',
  })
  cover_url?: string;

  @ApiPropertyOptional({
    enum: EssayStatus,
    example: EssayStatus.public,
    enumName: 'EssayStatus',
  })
  status?: EssayStatus;

  @ApiPropertyOptional({
    example: 'en',
    minLength: 2,
    maxLength: 5,
  })
  language?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: [String],
    isArray: true,
  })
  hashtag_names?: string[];
}
