import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginGoogleDto {
  @IsString()
  uuid: string;
}