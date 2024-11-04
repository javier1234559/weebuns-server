import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSpaceDto {
  @ApiProperty({
    description: 'The updated name of the space',
    example: 'Advanced English Learning Group',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The updated description of the space',
    example:
      'A group aimed at advanced English learners with essays, quizzes, and vocabulary challenges',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The updated number of essays in the space',
    example: 15,
    minimum: 0,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  essay_number?: number;

  @ApiPropertyOptional({
    description: 'The updated number of quizzes in the space',
    example: 8,
    minimum: 0,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  quiz_number?: number;

  @ApiPropertyOptional({
    description: 'The updated number of vocabulary items in the space',
    example: 75,
    minimum: 0,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  vocab_number?: number;
}
