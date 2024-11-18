import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ExploreCoursesQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ default: 1 })
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ default: 10 })
  perPage?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  search?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  language?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  minLevel?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  maxLevel?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: [String] })
  topics?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  courseType?: string;
}
