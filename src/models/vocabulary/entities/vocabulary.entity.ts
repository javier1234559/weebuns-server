import { Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IVocabulary } from 'src/models/vocabulary/vocabulary.interface';

// @ObjectType()
export class Vocabulary implements IVocabulary {
  @Field(() => ID)
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'https://example.com/images/word.jpg',
    nullable: true,
  })
  image_url: string;

  @Field()
  @ApiProperty({
    example: 'ephemeral',
  })
  word: string;

  @Field()
  @ApiProperty({
    example: 'adjective',
  })
  part_of_speech: string;

  @Field()
  @ApiProperty({
    example: 'Lasting for a very short time',
  })
  definition: string;

  @Field()
  @ApiProperty({
    example: 'ih-fem-er-uhl',
  })
  pronunciation: string;

  @Field()
  @ApiProperty({
    example:
      'The ephemeral nature of fashion trends makes it hard to stay current.',
  })
  example: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'https://dictionary.com/ephemeral',
    nullable: true,
  })
  reference_link: string;

  @Field()
  @ApiProperty({
    example: '123',
  })
  id_essay_link: string;

  @Field()
  @ApiProperty({
    example: '456',
  })
  id_space: string;

  @Field()
  @ApiProperty({
    example: 'intermediate',
  })
  mastery_level: string;

  @Field()
  @ApiProperty({
    example: true,
  })
  is_need_review: boolean;

  @Field()
  @ApiProperty({
    example: '2024-10-25',
  })
  next_review_date: string;

  @Field()
  @ApiProperty({
    example: 2.5,
  })
  ease_factor: number;

  @Field()
  @ApiProperty({
    example: 7,
  })
  interval: number;

  @Field()
  @ApiProperty({
    example: '789',
  })
  created_by: string;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-10-24T12:00:00Z',
  })
  created_at: Date;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-10-24T12:00:00Z',
  })
  updated_at: Date;
}
