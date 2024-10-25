import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class DeleteQuizResponseDto {
  @Field()
  @ApiProperty()
  message: string;
}
