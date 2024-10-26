import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';
import { IHashtag } from '../hashtag.interface';

@ObjectType()
export class Hashtag implements IHashtag {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: string;

  @Field()
  @ApiProperty({
    example: 'grammar',
    description: 'Name of the hashtag without # symbol',
  })
  name: string;

  @Field(() => Int)
  @ApiProperty({
    example: 42,
    description: 'Number of times this hashtag has been used',
    minimum: 0,
  })
  usage_count: number;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'When the hashtag was created',
  })
  created_at: Date;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'When the hashtag was last updated',
  })
  updated_at: Date;

  @Field(() => [EssayHashtag], { nullable: true })
  @ApiProperty({
    type: () => [EssayHashtag],
    nullable: true,
    description: 'Essays associated with this hashtag',
  })
  essays?: EssayHashtag[];
}
