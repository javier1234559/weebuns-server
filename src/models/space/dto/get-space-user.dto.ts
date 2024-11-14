import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetSpacesUserDto {
  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ example: 10, required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  perPage?: number = 10;

  @ApiProperty({ example: 'search term', required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
