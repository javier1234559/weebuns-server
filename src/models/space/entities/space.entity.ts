import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Essay } from 'src/models/essay/entities/essay.entity';
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

  @Field(() => Int, { nullable: true })
  @ApiProperty({ example: 5, nullable: true })
  essay_number: number | null;

  @Field(() => Int, { nullable: true })
  @ApiProperty({ example: 10, nullable: true })
  quiz_number: number | null;

  @Field(() => Int, { nullable: true })
  @ApiProperty({ example: 20, nullable: true })
  vocab_number: number | null;

  @Field()
  @ApiProperty({ example: 1 })
  created_by: string;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  // @Field(() => User, { nullable: true })
  // @ApiProperty({ type: () => User, nullable: true })
  // user?: User;

  @Field(() => [Essay], { nullable: true })
  @ApiProperty({ type: () => [Essay], nullable: true })
  essays?: Essay[];
}
