import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

import { ExistEntities } from 'src/common/decorators/exist-entities.decorator';
import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

export class CreateEssayDto {
  @ApiProperty({
    description: 'The title of the essay',
    example: 'My Journey Learning English',
    minLength: 1,
    maxLength: 255,
  })
  title: string;

  @ApiPropertyOptional({
    description: 'A brief summary of the essay content',
    example:
      'A personal story about my experience learning English as a second language',
    nullable: true,
  })
  summary?: string;

  @ApiProperty({
    description: 'The main content of the essay',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    minLength: 1,
  })
  content: string;

  @ApiPropertyOptional({
    description: 'URL of the essay cover image',
    example: 'https://example.com/images/cover-123.jpg',
    nullable: true,
    pattern: '^https?://',
  })
  cover_url?: string;

  @ApiProperty({
    enum: EssayStatus,
    description: 'The visibility status of the essay',
    example: EssayStatus.public,
    enumName: 'EssayStatus',
  })
  status: EssayStatus;

  @ApiProperty({
    description: 'The language code of the essay',
    example: 'en',
    minLength: 2,
    maxLength: 5,
  })
  language: string;

  @ExistEntity('space')
  // @ExistInDb({
  //   model: 'space',
  //   field: 'id',
  // })
  @ApiProperty({
    description: 'ID of the space where the essay belongs',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  spaceId: string;

  @ExistEntity('user')
  @ApiProperty({
    description: 'ID of the user creating the essay',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  created_by: string;

  @IsOptional()
  @ExistEntities('hashtag')
  @ApiPropertyOptional({
    description: 'Array of hashtag IDs to associate with the essay',
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
    type: [String],
    format: 'uuid',
    isArray: true,
    required: false,
  })
  hashtag_ids?: string[];
}
