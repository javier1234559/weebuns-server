import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ICorrectionSentence } from 'src/models/correction-sentence/correction-sentence.interfacte';

@ObjectType()
export class CorrectionSentence implements ICorrectionSentence {
  @Field(() => ID)
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Field(() => ID)
  @ApiProperty({ example: 'uuid' })
  correctionId: string;

  @Field()
  @ApiProperty({ example: 0 })
  index: number;

  @Field()
  @ApiProperty({ example: 'original text' })
  originalText: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'corrected text' })
  correctedText: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'explanation' })
  explanation: string;

  @Field()
  @ApiProperty({ example: true })
  isCorrect: boolean;

  @Field()
  @ApiProperty({ example: 4.5 })
  rating: number;

  @Field()
  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;

  @Field()
  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: Date;
}
