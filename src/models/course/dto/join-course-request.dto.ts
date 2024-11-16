import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

export class JoinCourseRequestDto {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  spaceId: string;
}
