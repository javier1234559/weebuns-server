import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { QuizQuestion } from 'src/migration/quiz-question/entities/quiz-question.entity';

@ObjectType()
export class QuizQuestionResponse {
  @Field(() => [QuizQuestion])
  @ApiProperty()
  data: QuizQuestion[];

  @Field(() => PaginationOutputDto)
  @ApiProperty()
  pagination: PaginationOutputDto;
}
