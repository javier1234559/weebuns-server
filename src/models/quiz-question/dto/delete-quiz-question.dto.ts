import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

export class DeleteQuizQuestionDto {
  @ApiProperty()
  @IsInt()
  id: number;
}
