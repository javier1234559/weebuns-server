import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';

import { Quiz } from './../../../migration/quiz/entities/quiz.entity';

@ObjectType()
export class QuizResponse {
  @Field(() => [Quiz])
  @ApiProperty()
  data: Quiz[];

  @Field(() => PaginationOutputDto)
  @ApiProperty()
  pagination: PaginationOutputDto;
}
