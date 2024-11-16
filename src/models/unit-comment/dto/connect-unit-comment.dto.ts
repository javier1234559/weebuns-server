import { ApiProperty } from '@nestjs/swagger';

export class ConnectUnitCommentDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
