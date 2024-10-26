import { Field, InputType } from '@nestjs/graphql';
import { OmitType, PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '@prisma/client';
import { IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {
  // validation
  @IsString()
  // docs
  @ApiProperty({ type: Number, nullable: true })
  // graphql
  @Field(() => UserRole, { nullable: true })
  id: string;
}
