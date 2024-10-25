import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateQuizQuestionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  question_text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  correct_answer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  user_answer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  id_vocabulary?: number;
}
