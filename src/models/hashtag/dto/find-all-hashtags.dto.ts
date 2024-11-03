import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import { PaginationInputDto } from 'src/common/dto/pagination.dto';

export class FindAllHashtagsDto extends PaginationInputDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
