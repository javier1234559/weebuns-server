import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { FlashCard } from '../../flash-card/entities/flash-card.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class CreateVocabularyResponseDto {
  @Field()
  @ApiProperty()
  id: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  image_url?: string;

  @Field()
  @ApiProperty()
  word: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  part_of_speech?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  definition?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  pronunciation?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  example?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  reference_link?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  id_essay_link?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  id_space?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  mastery_level?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  is_need_review?: boolean;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  next_review_date?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  ease_factor?: number;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  interval?: number;

  @Field()
  @ApiProperty()
  created_by: string;

  @Field()
  @ApiProperty()
  created_at: Date;

  @Field()
  @ApiProperty()
  updated_at: Date;

  @Field(() => User, { nullable: true })
  @ApiProperty({ type: () => User, required: false })
  creator?: User;

  @Field(() => Space, { nullable: true })
  @ApiProperty({ type: () => Space, required: false })
  space?: Space;

  @Field(() => [FlashCard], { nullable: true })
  @ApiProperty({ type: () => [FlashCard], required: false })
  flash_cards?: FlashCard[];
}
