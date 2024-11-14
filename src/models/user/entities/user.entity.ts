import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { $Enums, AuthProvider, UserRole } from '@prisma/client';

import { LanguageCode } from 'src/common/enum/common';
import { CorrectionReply } from 'src/models/correction-reply/entities/correction-reply.entity';
import { Correction } from 'src/models/correction/entities/correction.entity';
import { Course } from 'src/models/course/entities/course.entity';
import { Note } from 'src/models/note/entities/note.entity';
import { Space } from 'src/models/space/entities/space.entity';
import { UserCourse } from 'src/models/user-course/entities/user-course.entity';
import { IUser } from 'src/models/user/user.interface';
import { Vocabulary } from 'src/models/vocabulary/entities/vocabulary.entity';

import { Essay } from '../../essay/entities/essay.entity';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles in the system',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Authentication providers',
});

registerEnumType(LanguageCode, {
  name: 'LanguageCode',
  description: 'Available language codes',
});

@ObjectType()
export class User implements IUser {
  // GraphQL fields (snake_case)
  @Field(() => ID)
  @ApiProperty({ example: '00321d6f-2bcf-4985-9659-92a571275da6' })
  id: string;

  @Field()
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @Field()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ nullable: true })
  passwordHash: string | null;

  @Field(() => UserRole)
  @ApiProperty({ enum: UserRole, example: UserRole.user })
  role: UserRole;

  @Field(() => AuthProvider)
  @ApiProperty({ enum: AuthProvider, example: AuthProvider.local })
  authProvider: $Enums.AuthProvider;

  @Field(() => String, { nullable: true })
  @ApiProperty({ nullable: true })
  authProviderId: string | null;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'John', nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'Doe', nullable: true })
  lastName: string | null;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  profilePicture: string | null;

  @Field()
  @ApiProperty({ example: false })
  isEmailVerified: boolean;

  @Field(() => LanguageCode)
  @ApiProperty({
    enum: LanguageCode,
    example: LanguageCode.VIETNAMESE,
    description: "User's native language",
  })
  nativeLanguage: string;

  @Field(() => Date, { nullable: true })
  @ApiProperty({ nullable: true })
  lastLogin: Date | null;

  @Field(() => Date)
  @ApiProperty()
  createdAt: Date;

  @Field(() => Date)
  @ApiProperty()
  updatedAt: Date;

  @Field(() => Date)
  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ type: () => [Course], nullable: true })
  courses?: Course[];

  @ApiProperty({ type: () => [UserCourse], nullable: true })
  user_courses?: UserCourse[];

  @ApiProperty({ type: () => [Note], nullable: true })
  notes?: Note[];

  @ApiProperty({ type: () => [Vocabulary], nullable: true })
  vocabularies?: Vocabulary[];

  @ApiProperty({ type: () => [Space], nullable: true })
  spaces?: Space[];

  @ApiProperty({ type: () => [Essay], nullable: true })
  essays?: Essay[];

  @ApiProperty({ type: () => [Correction], nullable: true })
  corrections?: Correction[];

  @ApiProperty({ type: () => [CorrectionReply], nullable: true })
  correction_replies?: CorrectionReply[];
}
