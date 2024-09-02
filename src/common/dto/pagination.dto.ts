import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

@InputType()
export class PaginationInputDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  //docs
  @ApiPropertyOptional()
  page?: number = 1;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  //docs
  @ApiPropertyOptional()
  perPage?: number = 10;
}

@ObjectType()
export class PaginationOutputDto {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}
