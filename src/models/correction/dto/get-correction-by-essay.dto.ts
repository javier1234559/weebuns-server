import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUUID } from 'class-validator';

import { PaginationInputDto } from 'src/common/dto/pagination.dto';

@InputType()
export class GetCorrectionsByEssayDto extends PaginationInputDto {
  @ApiProperty()
  @Field()
  @IsString()
  @IsUUID()
  essayId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
