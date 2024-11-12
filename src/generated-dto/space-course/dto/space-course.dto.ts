import { ApiProperty } from '@nestjs/swagger';

export class SpaceCourseDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  joinedAt: Date;
}
