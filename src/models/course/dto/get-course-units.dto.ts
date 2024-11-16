import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import {
  PaginationInputDto,
  PaginationOutputDto,
} from 'src/common/dto/pagination.dto';
import { Course } from 'src/models/course/entities/course.entity';
import { Unit } from 'src/models/unit/entities/unit.entity';

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

export class CourseUnitResponseDto {
  @ApiProperty({ type: [Unit] })
  data: Unit[];

  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
