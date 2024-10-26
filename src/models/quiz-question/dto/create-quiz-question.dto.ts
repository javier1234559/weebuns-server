import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @ApiProperty()
  @IsString()
  question_text: string;

  @ApiProperty()
  @IsString()
  correct_answer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  user_answer?: string;

  @ApiProperty()
  @IsBoolean()
  is_correct: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  id_vocabulary?: string;
}
