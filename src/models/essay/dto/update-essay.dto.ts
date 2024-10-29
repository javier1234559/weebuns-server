import { ApiPropertyOptional } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

import { ExistEntities } from 'src/common/decorators/exist-entities.decorator';

export class UpdateEssayDto {
  @ApiPropertyOptional({
    description: 'The title of the essay',
    example: 'Updated: My Journey Learning English',
    minLength: 1,
    maxLength: 255,
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'A brief summary of the essay content',
    example: 'Updated summary of my language learning experience',
    nullable: true,
  })
  summary?: string;

  @ApiPropertyOptional({
    description: 'The main content of the essay',
    example: 'Updated content: Lorem ipsum dolor sit amet...',
    minLength: 1,
  })
  content?: string;

  @ApiPropertyOptional({
    description: 'Number of upvotes for the essay',
    example: 42,
    minimum: 0,
  })
  upvote_count: number;

  @ApiPropertyOptional({
    description: 'URL of the essay cover image',
    example: 'https://example.com/images/updated-cover-123.jpg',
    nullable: true,
    pattern: '^https?://',
  })
  cover_url?: string;

  @ApiPropertyOptional({
    enum: EssayStatus,
    description: 'The visibility status of the essay',
    example: EssayStatus.public,
    enumName: 'EssayStatus',
  })
  status?: EssayStatus;

  @ApiPropertyOptional({
    description: 'The language code of the essay',
    example: 'en',
    minLength: 2,
    maxLength: 5,
  })
  language?: string;

  @IsOptional()
  @ExistEntities('hashtag')
  @ApiPropertyOptional({
    description: 'Array of hashtag IDs to associate with the essay',
    type: [String],
    isArray: true,
  })
  hashtag_ids?: string[];
}
