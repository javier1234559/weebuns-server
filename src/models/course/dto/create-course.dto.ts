import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'English Grammar Course' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Learn English grammar from basic to advanced' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty({ example: 'ENGLISH' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'BEGINNER' })
  @IsString()
  minLevel: string;

  @ApiProperty({ example: 'INTERMEDIATE' })
  @IsString()
  maxLevel: string;

  @ApiProperty({ example: '100' })
  @IsNumber()
  totalWeight: number;

  @ApiProperty({ example: ['ACADEMIC', 'BUSINESS'] })
  @IsArray()
  @IsString({ each: true })
  topics: string[];

  @ApiProperty({ example: 'COMMUNICATION' })
  @IsString()
  courseType: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean = false;
}
