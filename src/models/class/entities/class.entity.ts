import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ClassMember } from 'src/models/class-member/entities/class-member.entity';
import { User } from 'src/models/user/graphql/entities/user.entity';

@ObjectType()
export class Class {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  created_by: number;

  @Field(() => User, { nullable: true })
  creator?: User;

  @Field()
  is_trial: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => [ClassMember], { nullable: true })
  members?: ClassMember[];
}
