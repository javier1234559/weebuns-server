import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  id_space: string;

  @ApiProperty()
  @IsInt()
  created_by: string;
}
