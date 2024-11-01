import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IEssayHashtag } from 'src/models/essay-hashtag/essay-hashtag.interface';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';

import { Essay } from '../../essay/entities/essay.entity';

@ObjectType()
export class EssayHashtag implements IEssayHashtag {
  @Field(() => ID)
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @Field(() => ID)
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  essay_id: string;

  @Field(() => ID)
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  hashtag_id: string;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  created_at: Date;

  @Field(() => Essay, {
    nullable: true,
  })
  @ApiProperty({
    type: () => Essay,
    nullable: true,
    required: false,
  })
  essay?: Essay;

  @Field(() => Hashtag, {
    nullable: true,
  })
  @ApiProperty({
    type: () => Hashtag,
    nullable: true,
    required: false,
  })
  hashtag?: Hashtag;
}
