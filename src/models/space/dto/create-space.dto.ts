import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  essay_number?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quiz_number?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  vocab_number?: number;
}
