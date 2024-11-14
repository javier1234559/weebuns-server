import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  date: Date;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  level: number;
}
