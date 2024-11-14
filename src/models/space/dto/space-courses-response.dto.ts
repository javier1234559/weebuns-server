import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from './pagination.dto';
import { SpaceCourseDto } from './space-course.dto';

export class SpaceCoursesResponseDto {
  @ApiProperty({ type: [SpaceCourseDto] })
  data: SpaceCourseDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}
