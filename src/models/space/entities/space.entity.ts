import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ISpace } from 'src/models/space/space.interface';
import { User } from 'src/models/user/entities/user.entity';

@ObjectType()
class SpaceCount {
  @Field(() => Int)
  @ApiProperty({ example: 0 })
  essays: number;

  @Field(() => Int)
  @ApiProperty({ example: 0 })
  quizzes: number;

  @Field(() => Int)
  @ApiProperty({ example: 0 })
  vocabularies: number;
}

@ObjectType()
export class Space implements ISpace {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: string;

  @Field()
  @ApiProperty({ example: 'English Learning Space' })
  name: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'A space for learning English', nullable: true })
  description: string | null;

  @Field(() => User)
  @ApiProperty({ example: 1 })
  created_by: string;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  @Field(() => SpaceCount, { nullable: true })
  @ApiProperty({
    type: 'object',
    properties: {
      essays: { type: 'number', example: 0 },
      quizzes: { type: 'number', example: 0 },
      vocabularies: { type: 'number', example: 0 },
    },
    example: {
      essays: 0,
      quizzes: 0,
      vocabularies: 0,
    },
  })
  _count?: SpaceCount;
}
