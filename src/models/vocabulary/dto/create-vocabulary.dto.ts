import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({ type: 'number', required: false, nullable: true })
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 5) : null))
  repetitionLevel: number;
}
