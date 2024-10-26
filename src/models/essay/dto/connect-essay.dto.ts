import { ApiProperty } from '@nestjs/swagger';

import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

export class ConnectEssayDto {
  @ExistEntity('essay')
  @ApiProperty({
    description: 'ID of essay',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;
}
