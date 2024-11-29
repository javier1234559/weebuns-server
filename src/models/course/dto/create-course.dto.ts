import { ApiProperty } from '@nestjs/swagger';

import { ContentStatus } from '@prisma/client';

export class CreateCourseDto {
  @ApiProperty({
    type: 'string',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  thumbnailUrl?: string | null;

  @ApiProperty({
    type: 'string',
  })
  language: string;

  @ApiProperty({
    type: 'string',
  })
  minLevel: string;

  @ApiProperty({
    type: 'string',
  })
  maxLevel: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  topics: string[];

  @ApiProperty({
    type: 'string',
  })
  courseType: string;

  @ApiProperty({
    type: 'number',
    required: false,
    default: 0,
  })
  totalWeight?: number;

  @ApiProperty({
    enum: ContentStatus,
    default: ContentStatus.draft,
    required: false,
  })
  status?: ContentStatus;

  @ApiProperty({
    type: 'boolean',
    default: false,
    required: false,
  })
  isPremium?: boolean;
}
