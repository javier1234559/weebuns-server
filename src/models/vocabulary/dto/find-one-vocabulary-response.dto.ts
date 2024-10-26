import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Vocabulary } from 'src/models/vocabulary/entities/vocabulary.entity';

@ObjectType()
export class FindOneVocabularyResponseDto {
  @Field(() => Vocabulary)
  @ApiProperty({ type: Vocabulary })
  vocabulary: Vocabulary;
}
