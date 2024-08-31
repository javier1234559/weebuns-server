import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthProvider, UserRole } from 'src/common/type';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  last_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  first_name?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsEnum(AuthProvider)
  auth_provider?: AuthProvider;
}
