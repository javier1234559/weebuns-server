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
  })
  name: string;

  @Field(() => Int)
  @ApiProperty({
    example: 42,
    minimum: 0,
  })
  usage_count: number;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
  })
  created_at: Date;

  @Field(() => Date)
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
  })
  updated_at: Date;

  @Field(() => [EssayHashtag], { nullable: true })
  @ApiProperty({
    type: () => [EssayHashtag],
    nullable: true,
  })
  essays?: EssayHashtag[];
}
