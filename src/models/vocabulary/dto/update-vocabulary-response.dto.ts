import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class UpdateVocabularyResponseDto {
  @Field()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the vocabulary entry',
  })
  id: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 'https://example.com/images/vocabulary/word.jpg',
    description: 'URL of the associated image',
    nullable: true,
  })
  image_url?: string;

  @Field()
  @ApiProperty({
    example: 'ephemeral',
    description: 'The vocabulary word',
  })
  word: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 'adjective',
    description: 'Part of speech (e.g., noun, verb, adjective)',
    nullable: true,
  })
  part_of_speech?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 'Lasting for a very short time',
    description: 'Definition of the word',
    nullable: true,
  })
  definition?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 'ih-fem-er-uhl',
    description: 'Phonetic pronunciation of the word',
    nullable: true,
  })
  pronunciation?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example:
      'The ephemeral nature of fashion trends makes it hard to stay current.',
    description: 'Example sentence using the word',
    nullable: true,
  })
  example?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 'https://dictionary.com/word/ephemeral',
    description: 'External reference link for the word',
    nullable: true,
  })
  reference_link?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: '789abc-def-456',
    description: 'ID of the related essay',
    nullable: true,
  })
  id_essay_link?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: '123xyz-789',
    description: 'ID of the space this vocabulary belongs to',
    nullable: true,
  })
  id_space?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 'intermediate',
    description:
      'Current mastery level (e.g., beginner, intermediate, advanced)',
    nullable: true,
  })
  mastery_level?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: true,
    description: 'Indicates if the word needs to be reviewed',
    nullable: true,
  })
  is_need_review?: boolean;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: '2024-10-25T00:00:00Z',
    description: 'Next scheduled review date',
    nullable: true,
  })
  next_review_date?: string;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 2.5,
    description:
      'Spaced repetition ease factor (typically between 1.3 and 2.5)',
    nullable: true,
  })
  ease_factor?: number;

  @Field({ nullable: true })
  @ApiProperty({
    required: false,
    example: 7,
    description: 'Days until next review',
    nullable: true,
  })
  interval?: number;

  @Field()
  @ApiProperty({
    example: '456def-789',
    description: 'ID of the user who created this vocabulary entry',
  })
  created_by: string;

  @Field()
  @ApiProperty({
    example: '2024-10-24T12:00:00Z',
    description: 'Timestamp when the vocabulary was created',
  })
  created_at: Date;

  @Field()
  @ApiProperty({
    example: '2024-10-24T14:30:00Z',
    description: 'Timestamp of the last update',
  })
  updated_at: Date;
}
