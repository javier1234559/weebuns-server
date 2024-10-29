import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

import { User } from 'src/models/user/entities/user.entity';

import { CorrectionSentence } from '../../correction-sentence/entities/correction-sentence.entity';

@ObjectType()
export class CorrectionResponseOneDto {
  @Field(() => ID)
  @IsUUID()
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Field()
  @IsUUID()
  @ApiProperty({ example: 'uuid' })
  essay_id: string;

  @Field()
  @IsUUID()
  @ApiProperty({ example: 'uuid' })
  created_by: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 'Overall comment', nullable: true })
  overall_comment?: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 4, nullable: true })
  rating?: number;

  @Field(() => Date)
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  created_at: Date;

  @Field(() => Date)
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updated_at: Date;

  @Field(() => User)
  @ApiProperty({ type: User })
  creator?: User;

  @Field(() => [CorrectionSentence], { nullable: true })
  @ApiProperty({ type: [CorrectionSentence], nullable: true })
  sentences?: CorrectionSentence[];
}
