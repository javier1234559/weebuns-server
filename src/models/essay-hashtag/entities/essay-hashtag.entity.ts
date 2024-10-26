import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IEssayHashtag } from 'src/models/essay-hashtag/essay-hashtag.interface';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';

import { Essay } from '../../essay/entities/essay.entity';

@ObjectType({ description: 'Association between essays and hashtags' })
export class EssayHashtag implements IEssayHashtag {
  @Field(() => ID, {
    description: 'Unique identifier for the essay-hashtag association',
  })
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the essay-hashtag association',
    format: 'uuid',
  })
  id: string;

  @Field(() => String, {
    description: 'Name of the hashtag',
  })
  @ApiProperty({
    example: 'technology',
    description: 'Name of the hashtag',
    minLength: 1,
    maxLength: 50,
  })
  name: string;

  @Field(() => ID, {
    description: 'ID of the associated essay',
  })
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the associated essay',
    format: 'uuid',
  })
  essay_id: string;

  @Field(() => ID, {
    description: 'ID of the associated hashtag',
  })
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the associated hashtag',
    format: 'uuid',
  })
  hashtag_id: string;

  @Field(() => Int, {
    description: 'Number of times this hashtag has been used in essays',
  })
  @ApiProperty({
    example: 42,
    description: 'Number of times this hashtag has been used in essays',
    minimum: 0,
  })
  usage_count: number;

  @Field(() => Date, {
    description: 'Timestamp when the association was created',
  })
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Timestamp when the association was created',
    format: 'date-time',
  })
  created_at: Date;

  @Field(() => Date, {
    description: 'Timestamp when the association was last updated',
  })
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Timestamp when the association was last updated',
    format: 'date-time',
  })
  updated_at: Date;

  @Field(() => Essay, {
    nullable: true,
    description:
      'The associated essay details. Only populated when explicitly requested.',
  })
  @ApiProperty({
    type: () => Essay,
    nullable: true,
    description:
      'The associated essay details. Only populated when explicitly requested.',
    required: false,
  })
  essay?: Essay;

  // Commented out but preserved for future implementation
  @Field(() => Hashtag, {
    nullable: true,
    description:
      'The associated hashtag details. Only populated when explicitly requested.',
  })
  @ApiProperty({
    type: () => Hashtag,
    nullable: true,
    description:
      'The associated hashtag details. Only populated when explicitly requested.',
    required: false,
  })
  hashtag?: Hashtag;
}
