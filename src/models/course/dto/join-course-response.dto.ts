import { ApiProperty } from '@nestjs/swagger';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';

export class JoinCourseResponseDto {
  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty({ type: 'string' })
  joinedAt: Date;

  @ApiProperty({ type: CourseProgress })
  progress: CourseProgress;
}
