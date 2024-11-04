import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateQuizQuestionDto {
  @ApiPropertyOptional({
    description: 'The updated text of the quiz question',
    example: 'What is the capital of Spain?',
  })
  @IsOptional()
  @IsString()
  question_text?: string;

  @ApiPropertyOptional({
    description: 'The updated correct answer for the quiz question',
    example: 'Madrid',
  })
  @IsOptional()
  @IsString()
  correct_answer?: string;

  @ApiPropertyOptional({
    description: 'The updated user answer, if any',
    example: 'Barcelona',
  })
  @IsOptional()
  @IsString()
  user_answer?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the updated user answer is correct',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;

  @ApiPropertyOptional({
    description: 'The ID of an associated vocabulary item, if relevant',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsInt()
  id_vocabulary?: string;
}
