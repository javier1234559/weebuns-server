import { ApiProperty } from '@nestjs/swagger';

import { CourseDto } from 'src/models/course/dto/course.dto';
import { PaginationDto } from 'src/models/course/dto/pagination-course.dto';

export class GetCoursesResponseDto {
  @ApiProperty({ type: [CourseDto] })
  data: CourseDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}
