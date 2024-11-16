import { ApiProperty } from '@nestjs/swagger';

export class JoinCourseResponseDto {
  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty({ type: 'string' })
  joinedAt: Date;
}
