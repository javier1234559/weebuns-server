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

  @ApiProperty({ required: false, type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ obj, key }) => {
    // Handle string values from query params
    const value = obj[key];
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  isBookmarked?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  spaceId?: string;
}
