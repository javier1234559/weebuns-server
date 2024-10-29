import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ICorrectionSentence } from 'src/models/correction-sentence/correction-sentence.interfacte';
import { Correction } from 'src/models/correction/entities/correction.entity';

@ObjectType()
export class CorrectionSentence implements ICorrectionSentence {
  @Field(() => ID)
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Field()
  @ApiProperty({ example: 'uuid' })
  id_correction: string;

  @Field()
  @ApiProperty({ example: 0 })
  index: number;

  @Field()
  @ApiProperty({ example: 'Original text' })
  original_text: string;

  @Field(() => String)
  @ApiProperty({ example: 'Corrected text' })
  corrected_text: string;

  @Field(() => String)
  @ApiProperty({ example: 'Explanation of corrections' })
  explanation: string;

  @Field()
  @ApiProperty({ example: false })
  is_correct: boolean;

  @Field(() => Number)
  @ApiProperty({ example: 4 })
  rating: number;

  @Field(() => Date)
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  created_at: Date;

  @Field(() => Date)
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updated_at: Date;

  @Field(() => Correction, { nullable: true })
  @ApiProperty({ type: () => Correction, nullable: true })
  correction?: Correction;
}
