import { Field, ID, ObjectType } from '@nestjs/graphql';

import { $Enums } from '@prisma/client';

import { IUser } from 'src/models/user/user.interface';

@ObjectType() // object type is the return type of the resolver
export class User implements IUser {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  password_hash: string | null;

  @Field(() => $Enums.UserRole)
  role: $Enums.UserRole;

  @Field(() => $Enums.AuthProvider)
  auth_provider: $Enums.AuthProvider;

  @Field(() => String, { nullable: true })
  auth_provider_id: string | null;

  @Field(() => String, { nullable: true })
  first_name: string | null;

  @Field(() => String, { nullable: true })
  last_name: string | null;

  @Field(() => String, { nullable: true })
  profile_picture: string | null;

  @Field(() => Boolean)
  is_email_verified: boolean;

  @Field(() => Date, { nullable: true })
  last_login: Date | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
