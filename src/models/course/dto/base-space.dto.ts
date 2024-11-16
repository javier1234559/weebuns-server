import { ApiProperty } from '@nestjs/swagger';

export class BaseSpaceDto {
  @ApiProperty({
    type: 'string',
    description: 'ID của space',
  })
  spaceId: string;
}
