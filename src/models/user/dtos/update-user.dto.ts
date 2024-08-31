import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt } from 'class-validator';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {
  @IsInt()
  id: number;
}