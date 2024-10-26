import { Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IVocabulary } from 'src/models/vocabulary/vocabulary.interface';

// @ObjectType()
export class Vocabulary implements IVocabulary {
  @Field(() => ID)
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the vocabulary entry',
  })
  id: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'https://example.com/images/word.jpg',
    nullable: true,
    description: 'URL of the associated image',
  })
  image_url: string;

  @Field()
  @ApiProperty({
    example: 'ephemeral',
    description: 'The vocabulary word',
  })
  word: string;

  @Field()
  @ApiProperty({
    example: 'adjective',
    description: 'Part of speech of the word',
  })
  part_of_speech: string;

  @Field()
  @ApiProperty({
    example: 'Lasting for a very short time',
    description: 'Definition of the word',
  })
  definition: string;

  @Field()
  @ApiProperty({
    example: 'ih-fem-er-uhl',
    description: 'Pronunciation guide for the word',
  })
  pronunciation: string;

  @Field()
  @ApiProperty({
    example:
      'The ephemeral nature of fashion trends makes it hard to stay current.',
    description: 'Example usage of the word',
  })
  example: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'https://dictionary.com/ephemeral',
    nullable: true,
    description: 'Reference link for additional information',
  })
  reference_link: string;

  @Field()
  @ApiProperty({
    example: '123',
    description: 'ID of the linked essay',
  })
  id_essay_link: string;

  @Field()
  @ApiProperty({
    example: '456',
    description: 'ID of the space this vocabulary belongs to',
  })
  id_space: string;

  @Field()
  @ApiProperty({
    example: 'intermediate',
    description: 'Current mastery level of the word',
  })
  mastery_level: string;

  @Field()
  @ApiProperty({
    example: true,
    description: 'Indicates if the word needs review',
  })
  is_need_review: boolean;

  @Field()
  @ApiProperty({
    example: '2024-10-25',
    description: 'Next scheduled review date',
  })
  next_review_date: string;

  @Field()
  @ApiProperty({
    example: 2.5,
    description: 'Spaced repetition ease factor',
  })
  ease_factor: number;

  @Field()
  @ApiProperty({
    example: 7,
    description: 'Days interval for next review',
  })
  interval: number;

  @Field()
  @ApiProperty({
    example: '789',
    description: 'ID of the user who created this entry',
  })
  created_by: string;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-10-24T12:00:00Z',
    description: 'Creation timestamp',
  })
  created_at: Date;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-10-24T12:00:00Z',
    description: 'Last update timestamp',
  })
  updated_at: Date;
}
