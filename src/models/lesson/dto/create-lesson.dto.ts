import { ApiProperty } from '@nestjs/swagger';

import { ContentStatus, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  summary?: string | null;

  @ApiProperty({
    type: () => Object,
  })
  @IsObject()
  content: Prisma.InputJsonValue;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNumber()
  orderIndex: number;

  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @ApiProperty({
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  lessonWeight?: number;

  @ApiProperty({
    enum: ContentStatus,
    default: ContentStatus.draft,
  })
  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;
}
