import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ClassMemberRole } from '@prisma/client';

import { Class } from '../../class/entities/class.entity';
import { User } from '../../user/entities/user.entity';

registerEnumType(ClassMemberRole, {
  name: 'ClassMemberRole',
});

@ObjectType()
export class ClassMember {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  class_id: number;

  @Field(() => Class, { nullable: true })
  class?: Class;

  @Field(() => ID)
  user_id: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ClassMemberRole)
  role: ClassMemberRole;

  @Field(() => Date)
  joined_at: Date;
}
