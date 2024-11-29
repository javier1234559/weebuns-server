import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVocabularyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  spaceId: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  term: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  meaning: string[];

  @ApiProperty({ type: 'string', required: false, nullable: true })
  @IsString()
  @IsOptional()
  exampleSentence?: string | null;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string | null;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  @IsString()
  @IsOptional()
  referenceLink?: string | null;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  @IsString()
  @IsOptional()
  referenceName?: string | null;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  nextReview?: Date | null;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : JSON.parse(value)))
  tags: string[];

  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
    example: 1,
    description: 'Repetition level from 0 to 6',
  })
  @IsOptional()
  @IsIn([0, 1, 2, 3, 4, 5, 6], {
    message: 'repetitionLevel must be between 0 and 6',
  })
  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : null))
  repetitionLevel?: number;
}
