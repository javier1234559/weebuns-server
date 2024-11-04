import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class UpdateQuizDto {
  @ApiPropertyOptional({
    description: 'The new title of the quiz, if updating the title',
    example: 'Advanced English Grammar',
    minLength: 1,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  title?: string;
}
