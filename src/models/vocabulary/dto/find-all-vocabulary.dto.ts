import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginationInputDto } from 'src/common/dto/pagination.dto';

@InputType()
export class FindAllVocabularyDto extends PaginationInputDto {
  @ApiPropertyOptional()
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  dueDate?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  spaceId?: string;
}
