import { IsString } from 'class-validator';

export class RegisterGoogleDto {
  @IsString()
  uuid: string;
}