import { ApiProperty } from '@nestjs/swagger';

import { RecommendedCourseDto } from './recommended-course.dto';

export class RecommendCourseResponseDto {
  @ApiProperty({ type: [RecommendedCourseDto] })
  data: RecommendedCourseDto[];
}
