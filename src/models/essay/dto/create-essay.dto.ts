import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

export class CreateEssayDto {
  @ApiProperty({
    example: 'My Journey Learning English',
  })
  title: string;

  @ApiPropertyOptional({
    nullable: true,
  })
  summary?: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
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
  })
  spaceId: string;

  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      example: 'english',
      minLength: 2,
      maxLength: 50,
    },
    example: ['english', 'travel'],
  })
  hashtag_names?: string[];
}
