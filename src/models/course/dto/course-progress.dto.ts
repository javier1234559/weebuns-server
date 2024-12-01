import { ApiProperty } from '@nestjs/swagger';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';

export class CourseProgressResponseDto {
  @ApiProperty({
    type: CourseProgress,
  })
  courseProgress: CourseProgress;
}

export class UpdateCourseProgressDto {
  @ApiProperty({ required: false })
  currentUnitId?: string;

  @ApiProperty({ required: false })
  currentLessonId?: string;

  @ApiProperty({ required: false })
  nextUnitId?: string;

  @ApiProperty({ required: false })
  nextLessonId?: string;

  @ApiProperty({ required: false })
  completedWeight?: number;

  @ApiProperty({ required: false, type: [String] })
  completedUnits?: string[];

  @ApiProperty({ required: false, type: [String] })
  completedLessons?: string[];
}
