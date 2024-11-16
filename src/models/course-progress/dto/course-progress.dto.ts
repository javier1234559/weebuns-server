import { ApiProperty } from '@nestjs/swagger';

export class CourseProgressDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  completedWeight: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastAccessedAt: Date | null;
}
