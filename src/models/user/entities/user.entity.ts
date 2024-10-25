import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { AuthProvider, UserRole } from '@prisma/client';

import { Space } from 'src/models/space/entities/space.entity';
import { UserLanguage } from 'src/models/user-language/entities/user-language.entity';
import { IUser } from 'src/models/user/user.interface';

import { Essay } from '../../essay/entities/essay.entity';
import { Follower } from '../../follower/entities/follower.entity';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles in the system',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Authentication providers',
});

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  @ApiProperty({ example: '00321d6f-2bcf-4985-9659-92a571275da6' })
  id: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'johndoe', nullable: true })
  username: string | null;

  @Field()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ nullable: true })
  password_hash: string | null;

  @Field(() => UserRole)
  @ApiProperty({ enum: UserRole, example: UserRole.user })
  role: UserRole;

  @Field(() => AuthProvider)
  @ApiProperty({ enum: AuthProvider, example: AuthProvider.local })
  auth_provider: AuthProvider;

  @Field(() => String, { nullable: true })
  @ApiProperty({ nullable: true })
  auth_provider_id: string | null;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'John', nullable: true })
  first_name: string | null;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'Doe', nullable: true })
  last_name: string | null;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  profile_picture: string | null;

  @Field()
  @ApiProperty({ example: false })
  is_email_verified: boolean;

  @Field(() => Date, { nullable: true })
  @ApiProperty({ nullable: true })
  last_login: Date | null;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  @Field(() => [UserLanguage], { nullable: true })
  @ApiProperty({ type: () => [UserLanguage], nullable: true })
  languages?: UserLanguage[];

  @Field(() => [Follower], { nullable: true })
  @ApiProperty({ type: () => [Follower], nullable: true })
  followedBy?: Follower[];

  @Field(() => [Follower], { nullable: true })
  @ApiProperty({ type: () => [Follower], nullable: true })
  following?: Follower[];

  @Field(() => [Space], { nullable: true })
  @ApiProperty({ type: () => [Space], nullable: true })
  spaces?: Space[];

  @Field(() => [Essay], { nullable: true })
  @ApiProperty({ type: () => [Essay], nullable: true })
  essays?: Essay[];

  // @Field(() => [Quiz], { nullable: true })
  // @ApiProperty({ type: () => [Quiz], nullable: true })
  // quizzes?: Quiz[];

  // @Field(() => [Vocabulary], { nullable: true })
  // @ApiProperty({ type: () => [Vocabulary], nullable: true })
  // vocabularies?: Vocabulary[];

  // @Field(() => [FlashCard], { nullable: true })
  // @ApiProperty({ type: () => [FlashCard], nullable: true })
  // flash_cards?: FlashCard[];

  // @Field(() => [Correction], { nullable: true })
  // @ApiProperty({ type: () => [Correction], nullable: true })
  // corrections?: Correction[];

  // @Field(() => [CorrectionReply], { nullable: true })
  // @ApiProperty({ type: () => [CorrectionReply], nullable: true })
  // correction_replies?: CorrectionReply[];
}
