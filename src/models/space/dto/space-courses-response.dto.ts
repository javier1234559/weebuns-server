import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Course } from 'src/models/course/entities/course.entity';

export class SpaceCoursesResponseDto {
  @ApiProperty({ type: [Course] })
  data: Course[];

  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
