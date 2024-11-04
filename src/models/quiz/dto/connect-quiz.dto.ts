import { ApiProperty } from '@nestjs/swagger';

import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

export class ConnectQuizDto {
  @ExistEntity('quiz')
  @ApiProperty({
    description: 'ID of quiz',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;
}
