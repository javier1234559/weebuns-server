import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import { PaginationInputDto } from 'src/common/dto/pagination.dto';

export class GetCoursesRequestDto extends PaginationInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
