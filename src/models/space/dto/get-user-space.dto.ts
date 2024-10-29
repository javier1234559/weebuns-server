import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class GetUserSpacesDto {
  @Field()
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  userId: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @Field({ nullable: true })
  @ApiProperty({ example: 10, required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  @Field({ nullable: true })
  @ApiProperty({ example: 'search term', required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
