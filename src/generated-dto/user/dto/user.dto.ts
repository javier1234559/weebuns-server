import { ApiProperty } from '@nestjs/swagger';

import {
  AuthProvider,
  Prisma,
  ProficiencyLevel,
  UserRole,
} from '@prisma/client';

export class UserDto {
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
}
