import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @ApiProperty({
    description: 'The text of the quiz question',
    example: 'What is the capital of France?',
    minLength: 1,
  })
  @IsString()
  question_text: string;

  @ApiProperty({
    description: 'The correct answer to the question',
    example: 'Paris',
    minLength: 1,
  })
  @IsString()
  correct_answer: string;

  @ApiPropertyOptional({
    description: 'The answer provided by the user, if any',
    example: 'Paris',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  user_answer?: string;

  @ApiProperty({
    description: 'Indicates if the user answer is correct',
    example: true,
  })
  @IsBoolean()
  is_correct: boolean;

  @ApiPropertyOptional({
    description: 'The ID of an associated vocabulary item, if relevant',
    example: '123e4567-e89b-12d3-a456-426614174001',
    format: 'uuid',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id_vocabulary?: string;
}
