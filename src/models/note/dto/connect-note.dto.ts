import { ApiProperty } from '@nestjs/swagger';

export class ConnectNoteDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
