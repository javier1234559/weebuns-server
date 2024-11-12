import { ApiProperty } from '@nestjs/swagger';

import {
  AuthProvider,
  Prisma,
  ProficiencyLevel,
  UserRole,
} from '@prisma/client';

import { CorrectionReply } from '../../correction-reply/entities/correction-reply.entity';
import { Correction } from '../../correction/entities/correction.entity';
import { Course } from '../../course/entities/course.entity';
import { Essay } from '../../essay/entities/essay.entity';
import { Note } from '../../note/entities/note.entity';
import { Space } from '../../space/entities/space.entity';
import { UnitComment } from '../../unit-comment/entities/unit-comment.entity';
import { UserCourse } from '../../user-course/entities/user-course.entity';
import { Vocabulary } from '../../vocabulary/entities/vocabulary.entity';

export class User {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  username: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  passwordHash: string | null;
  @ApiProperty({
    enum: UserRole,
  })
  role: UserRole;
  @ApiProperty({
    enum: AuthProvider,
  })
  authProvider: AuthProvider;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  authProviderId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  firstName: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  lastName: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  profilePicture: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  isEmailVerified: boolean;
  @ApiProperty({
    enum: ProficiencyLevel,
  })
  currentLevel: ProficiencyLevel;
  @ApiProperty({
    type: () => Object,
  })
  languages: Prisma.JsonValue;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastLogin: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: () => Course,
    isArray: true,
    required: false,
  })
  courses?: Course[];
  @ApiProperty({
    type: () => UserCourse,
    isArray: true,
    required: false,
  })
  userCourses?: UserCourse[];
  @ApiProperty({
    type: () => Note,
    isArray: true,
    required: false,
  })
  notes?: Note[];
  @ApiProperty({
    type: () => Vocabulary,
    isArray: true,
    required: false,
  })
  vocabularies?: Vocabulary[];
  @ApiProperty({
    type: () => Space,
    isArray: true,
    required: false,
  })
  spaces?: Space[];
  @ApiProperty({
    type: () => Essay,
    isArray: true,
    required: false,
  })
  essays?: Essay[];
  @ApiProperty({
    type: () => Correction,
    isArray: true,
    required: false,
  })
  corrections?: Correction[];
  @ApiProperty({
    type: () => CorrectionReply,
    isArray: true,
    required: false,
  })
  correctionReplies?: CorrectionReply[];
  @ApiProperty({
    type: () => UnitComment,
    isArray: true,
    required: false,
  })
  unitComments?: UnitComment[];
}
