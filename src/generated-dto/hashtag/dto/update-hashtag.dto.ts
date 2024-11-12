import { ApiProperty } from '@nestjs/swagger';

export class UpdateHashtagDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  name?: string;
}
