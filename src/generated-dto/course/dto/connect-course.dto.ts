import { ApiProperty } from '@nestjs/swagger';

export class ConnectCourseDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
