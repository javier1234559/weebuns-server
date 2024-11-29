import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;

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
    type: 'string',
  })
  @IsString()
  courseId: string;
}
