import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';

import { Correction } from 'src/models/correction/entities/correction.entity';
import { IEssay } from 'src/models/essay/essay.interface';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';

import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

registerEnumType(EssayStatus, {
  name: 'EssayStatus',
  description: 'The status of an essay',
});

@ObjectType()
export class Essay implements IEssay {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: string;

  @Field()
  @ApiProperty({ example: 1 })
  id_space: string;

  @Field()
  @ApiProperty({ example: 'My First Essay' })
  title: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'A brief summary', nullable: true })
  summary: string | null;

  @Field()
  @ApiProperty({ example: 'Essay content...' })
  content: string;

  @Field()
  @ApiProperty({ example: 0 })
  upvote_count: number;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'https://example.com/cover.jpg', nullable: true })
  cover_url: string | null;

  @Field(() => EssayStatus)
  @ApiProperty({ enum: EssayStatus, example: EssayStatus.draft })
  status: EssayStatus;

  @Field()
  @ApiProperty({ example: 'en' })
  language: string;

  @Field()
  @ApiProperty({ example: 1 })
  created_by: string;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  @Field(() => Space, { nullable: true })
  @ApiProperty({ type: () => Space, nullable: true })
  space?: Space;

  @Field(() => User, { nullable: true })
  @ApiProperty({ type: () => User, nullable: true })
  author?: User;

  @Field(() => [Correction], { nullable: true })
  @ApiProperty({ type: () => [Correction], nullable: true })
  corrections?: Correction[];

  @Field(() => [Hashtag], { nullable: true })
  @ApiProperty({
    type: () => [Hashtag],
    nullable: true,
    description: 'Associated hashtags for this essay',
  })
  hashtags?: {
    hashtag: Hashtag;
  }[];
}
