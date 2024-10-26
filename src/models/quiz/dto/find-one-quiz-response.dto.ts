import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Quiz } from 'src/models/Quiz/entities/Quiz.entity';

@ObjectType()
export class FindOneQuizResponseDto {
  @Field(() => Quiz)
  @ApiProperty({ type: Quiz })
  quiz: Quiz;
}
