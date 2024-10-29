import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

import { ExistEntities } from 'src/common/decorators/exist-entities.decorator';
import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

export class CreateEssayDto {
  @ApiProperty({
    example: 'My Journey Learning English',
    minLength: 1,
    maxLength: 255,
  })
  title: string;

  @ApiPropertyOptional({
    nullable: true,
  })
  summary?: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    minLength: 1,
  })
  content: string;

  @ApiPropertyOptional({
    example: 'https://example.com/images/cover-123.jpg',
    nullable: true,
    pattern: '^https?://',
  })
  cover_url?: string;

  @ApiProperty({
    enum: EssayStatus,
    example: EssayStatus.public,
    enumName: 'EssayStatus',
  })
  status: EssayStatus;

  @ApiProperty({
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
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  spaceId: string;

  @ExistEntity('user')
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  created_by: string;

  @IsOptional()
  @ExistEntities('hashtag')
  @ApiPropertyOptional({
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
