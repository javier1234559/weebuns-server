import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Essay } from 'src/models/essay/entities/essay.entity';

@ObjectType()
export class EssaysResponse {
  @Field(() => [Essay])
  @ApiProperty({ type: [Essay] })
  data: Essay[];

  @Field(() => PaginationOutputDto)
  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
