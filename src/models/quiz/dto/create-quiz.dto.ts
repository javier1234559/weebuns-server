import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({
    description: 'The title of the quiz',
    example: 'English Grammar Basics',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The ID of the space to which the quiz belongs',
    example: '123e4567-e89b-12d3-a456-426614174001',
    format: 'uuid',
  })
  @IsString()
  id_space: string;

  @ApiProperty({
    description: 'The ID of the user creating the quiz',
    example: '123e4567-e89b-12d3-a456-426614174002',
    format: 'uuid',
  })
  @IsString()
  created_by: string;
}
