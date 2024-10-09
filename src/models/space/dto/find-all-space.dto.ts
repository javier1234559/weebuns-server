import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import {
  PaginationInputDto,
  PaginationOutputDto,
} from 'src/common/dto/pagination.dto';
import { Space } from 'src/models/space/entities/space.entity';

@InputType()
export class FindAllSpacesDto extends PaginationInputDto {
  //docs
  @ApiPropertyOptional()
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}

@ObjectType()
export class SpacesResponse {
  @Field(() => [Space])
  //docs
  @ApiProperty()
  data: Space[];

  @Field(() => PaginationOutputDto)
  //docs
  @ApiProperty()
  pagination: PaginationOutputDto;
}
