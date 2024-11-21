import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginationInputDto } from 'src/common/dto/pagination.dto';

export class FindAllNotesDto extends PaginationInputDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : JSON.parse(value)))
  tags?: string[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isBookmarked?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  spaceId?: string;
}
