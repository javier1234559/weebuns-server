import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { ISpace } from 'src/models/space/space.interface';

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

  @Field()
  @ApiProperty({ example: 1 })
  created_by: string;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  // @Field()
  // @ApiProperty()
  // @ApiProperty({
  //   example: {
  //     essays: 0,
  //     quizzes: 0,
  //     vocabularies: 0,
  //   },
  // })
  // _count?: {
  //   essays: number;
  //   quizzes: number;
  //   vocabularies: number;
  // };
}
