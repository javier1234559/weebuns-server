import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';

import { SpaceCourseDto } from './space-course.dto';

export class SpaceCoursesResponseDto {
  @ApiProperty({ type: [SpaceCourseDto] })
  data: SpaceCourseDto[];

  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
