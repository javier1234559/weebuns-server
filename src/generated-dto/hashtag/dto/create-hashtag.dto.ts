import { ApiProperty } from '@nestjs/swagger';

export class CreateHashtagDto {
  @ApiProperty({
    type: 'string',
  })
  name: string;
}
