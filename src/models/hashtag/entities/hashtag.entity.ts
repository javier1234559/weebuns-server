import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';
import { IHashtag } from '../hashtag.interface';

@ObjectType()
export class HashtagCount {
  @Field(() => Number)
  @ApiProperty({
    example: 5,
  })
  essays: number;
}

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

  @Field(() => HashtagCount, { nullable: true })
  @ApiProperty({
    type: HashtagCount,
    nullable: true,
  })
  _count?: HashtagCount;
}
