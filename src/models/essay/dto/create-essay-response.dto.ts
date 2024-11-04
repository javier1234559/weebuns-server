import { ObjectType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

import { ExistEntities } from 'src/common/decorators/exist-entities.decorator';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';
import { User } from 'src/models/user/entities/user.entity';

@ObjectType()
export class CreateEssayResponseDto {
  @ApiPropertyOptional({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id_space: string;

  @ApiPropertyOptional({
    example: 'Updated: My Journey Learning English',
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
    example: EssayStatus.public,
  })
  status?: EssayStatus;

  @ApiPropertyOptional({
    example: 'en',
    minLength: 2,
    maxLength: 5,
  })
  language?: string;

  @ApiPropertyOptional({
    description: 'Author',
  })
  author?: User;

  @IsOptional()
  @ExistEntities('hashtag', {
    message: 'One or more hashtags not found',
  })
  @ApiPropertyOptional({
    type: [String],
    isArray: true,
  })
  hashtags?: { hashtag: Hashtag }[];
}
