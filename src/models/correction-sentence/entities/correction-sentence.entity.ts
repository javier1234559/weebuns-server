import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ICorrectionSentence } from 'src/models/correction-sentence/correction-sentence.interfacte';
import { Correction } from 'src/models/correction/entities/correction.entity';

@ObjectType()
export class CorrectionSentence implements ICorrectionSentence {
  @Field(() => ID)
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Field()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  id_correction: string;

  @Field()
  @ApiProperty({ example: 'The original text with potential errors.' })
  original_text: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'The corrected text with fixes.',
    nullable: true,
  })
  corrected_text: string | null;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'Explanation of the corrections made.',
    nullable: true,
  })
  explanation: string | null;

  @Field()
  @ApiProperty({
    example: true,
    description: 'Indicates if the original text is correct',
  })
  is_correct: boolean;

  @Field(() => Number, { nullable: true })
  @ApiProperty({
    example: 4.5,
    nullable: true,
    description: 'Rating score for the correction',
  })
  rating: number | null;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  @Field(() => Correction, { nullable: true })
  @ApiProperty({ type: () => Correction, nullable: true })
  correction?: Correction;
}
