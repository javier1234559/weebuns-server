import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import {
  PaginationInputDto,
  PaginationOutputDto,
} from 'src/common/dto/pagination.dto';
import { Course } from 'src/models/course/entities/course.entity';
import { LessonWithoutContent } from 'src/models/lesson/dto/lesson-without-content.dto';

export class GetCourseUnitsRequestDto extends PaginationInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class CourseListResponseDto {
  @ApiProperty({ type: [Course] })
  data: Course[];

  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}

// export class CourseUnitResponseDto {
//   @ApiProperty({ type: [Unit] })
//   data: Unit[];

//   @ApiProperty({ type: PaginationOutputDto })
//   pagination: PaginationOutputDto;
// }

export class UnitWithLessonsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  courseId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  orderIndex: number;

  @ApiProperty()
  isPremium: boolean;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [LessonWithoutContent] })
  lessons: LessonWithoutContent[];
}

// Update the response DTO
export class CourseUnitResponseDto {
  @ApiProperty({ type: [UnitWithLessonsDto] })
  data: UnitWithLessonsDto[];

  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
