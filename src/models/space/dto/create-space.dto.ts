import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty({
    description: 'The name of the space',
    example: 'English Learning Group',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the space',
    example:
      'A group focused on improving English skills through essays and quizzes',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The number of essays in the space',
    example: 10,
    minimum: 0,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  essay_number?: number;

  @ApiPropertyOptional({
    description: 'The number of quizzes available in the space',
    example: 5,
    minimum: 0,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  quiz_number?: number;

  @ApiPropertyOptional({
    description: 'The number of vocabulary items in the space',
    example: 50,
    minimum: 0,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  vocab_number?: number;

  @ApiProperty({
    description: 'ID of the user who created the space',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsString()
  created_by: string;
}
