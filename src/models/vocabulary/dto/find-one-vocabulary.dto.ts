import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

@InputType()
export class FindOneVocabularyDto {
  @ApiProperty()
  @Field()
  @IsInt()
  id: string;
}
