import { Field, InputType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationInputDto } from 'src/common/dto/pagination.dto';

@InputType()
export class FindAllEssaysDto extends PaginationInputDto {
  @ApiPropertyOptional()
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: EssayStatus, example: EssayStatus.public })
  @IsOptional()
  @IsEnum(EssayStatus)
  status?: EssayStatus;
}
