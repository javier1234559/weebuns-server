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
  currentUnitContentId?: string;

  @ApiProperty({ required: false })
  nextUnitId?: string;

  @ApiProperty({ required: false })
  nextUnitContentId?: string;

  @ApiProperty({ required: false })
  completedWeight?: number;

  @ApiProperty({ required: false, type: [String] })
  completedUnits?: string[];

  @ApiProperty({ required: false, type: [String] })
  completedContents?: string[];
}
