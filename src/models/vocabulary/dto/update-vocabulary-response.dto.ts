import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class UpdateVocabularyResponseDto {
  @Field()
  @ApiProperty()
  id: number;

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
  id_space?: number;

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
  created_by: number;

  @Field()
  @ApiProperty()
  created_at: Date;

  @Field()
  @ApiProperty()
  updated_at: Date;
}
