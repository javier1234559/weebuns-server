import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IFollower } from 'src/models/follower/follower.interface';

import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Follower implements IFollower {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: string;

  @Field()
  @ApiProperty({ example: 1 })
  id_follower: string;

  @Field()
  @ApiProperty({ example: 2 })
  id_following: string;

  @Field(() => Date)
  @ApiProperty()
  followed_at: Date;

  @Field(() => User, { nullable: true })
  @ApiProperty({ type: () => User, nullable: true })
  follower?: User;

  @Field(() => User, { nullable: true })
  @ApiProperty({ type: () => User, nullable: true })
  following?: User;
}
