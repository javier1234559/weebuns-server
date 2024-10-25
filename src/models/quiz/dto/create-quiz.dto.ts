import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  id_space: number;

  @ApiProperty()
  @IsInt()
  created_by: number;
}
