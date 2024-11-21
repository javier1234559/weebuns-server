import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  spaceId: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  unitId: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : JSON.parse(value)))
  tags: string[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isBookmarked?: boolean;
}
