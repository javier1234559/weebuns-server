import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { CorrectionReply } from 'src/models/correction-reply/entities/correction-reply.entity';
import { CorrectionSentence } from 'src/models/correction-sentence/entities/correction-sentence.entity';
import { ICorrection } from 'src/models/correction/correction.interface';
import { Essay } from 'src/models/essay/entities/essay.entity';

import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Correction implements ICorrection {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: string;

  @Field()
  @ApiProperty({ example: 1, description: 'ID of the essay being corrected' })
  essay_id: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'Good structure but needs work on tenses',
    nullable: true,
    description: 'Overall feedback for the essay',
  })
  overall_comment: string | null;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 8,
    nullable: true,
    description: 'Rating score for the essay',
    minimum: 0,
    maximum: 10,
  })
  rating: number | null;

  @Field()
  @ApiProperty({
    example: 1,
    description: 'User ID who created the correction',
  })
  created_by: string;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  @Field(() => Essay, { nullable: true })
  @ApiProperty({ type: () => Essay, nullable: true })
  essay?: Essay;

  @Field(() => User, { nullable: true })
  @ApiProperty({ type: () => User, nullable: true })
  creator?: User;

  @Field(() => [CorrectionSentence], { nullable: true })
  @ApiProperty({ type: () => [CorrectionSentence], nullable: true })
  sentences?: CorrectionSentence[];

  @Field(() => [CorrectionReply], { nullable: true })
  @ApiProperty({ type: () => [CorrectionReply], nullable: true })
  replies?: CorrectionReply[];
}
