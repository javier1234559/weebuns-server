import { ApiProperty } from '@nestjs/swagger';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';

export class CheckJoinedCourseResponseDto {
  @ApiProperty()
  check: boolean;

  @ApiProperty({ type: CourseProgress, required: false })
  progress?: CourseProgress | null;
}
