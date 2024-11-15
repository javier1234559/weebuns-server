import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  level?: number;
}
