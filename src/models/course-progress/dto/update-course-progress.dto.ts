import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseProgressDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  lastAccessedAt?: Date | null;
}
