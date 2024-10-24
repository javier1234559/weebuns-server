import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class DeleteVocabularyResponseDto {
  @Field()
  @ApiProperty()
  message: string;
}
