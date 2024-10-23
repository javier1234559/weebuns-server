import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Vocabulary } from 'src/models/Vocabulary/entities/Vocabulary.entity';

@ObjectType()
export class FindOneVocabularyResponseDto {
  @Field(() => Vocabulary)
  @ApiProperty({ type: Vocabulary })
  vocabulary: Vocabulary;
}
