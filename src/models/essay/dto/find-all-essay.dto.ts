import { Field, InputType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ContentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationInputDto } from 'src/common/dto/pagination.dto';

@InputType()
export class FindAllEssaysDto extends PaginationInputDto {
  @ApiPropertyOptional()
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ContentStatus,
    example: ContentStatus.published,
  })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
