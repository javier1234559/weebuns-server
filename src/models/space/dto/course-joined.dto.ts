import { ApiProperty, OmitType } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Course } from 'src/models/course/entities/course.entity';

import { CourseProgress } from '../../course-progress/entities/course-progress.entity';

export class CourseJoinedDto extends OmitType(Course, ['progress'] as const) {
  @ApiProperty({
    type: () => CourseProgress,
    nullable: true,
  })
  progress?: CourseProgress | null;
}

export class SpaceCoursesJoinedResponseDto {
  @ApiProperty({
    type: CourseJoinedDto,
    isArray: true,
  })
  data: CourseJoinedDto[];

  @ApiProperty({
    type: PaginationOutputDto,
  })
  pagination: PaginationOutputDto;
}
