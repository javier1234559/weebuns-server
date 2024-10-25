import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class DeleteQuizQuestionResponseDto {
  @Field()
  @ApiProperty()
  message: string;
}
