import { ApiProperty } from '@nestjs/swagger';

import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

export class ConnectQuizQuestionDto {
  @ExistEntity('quizQuestion')
  @ApiProperty({
    description: 'ID of quiz question',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;
}
