import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import { LessonWithoutContent } from 'src/models/lesson/dto/lesson-without-content.dto';

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
export class BulkUpdateUnitsDto {
  @ApiProperty()
  @IsString()
  courseId: string;

  @ApiProperty({ type: [UnitWithLessonsDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitWithLessonsDto)
  units: UnitWithLessonsDto[];
}

export class BulkUpdateUnitsResponseDto {
  @ApiProperty({ type: [UnitWithLessonsDto] })
  data: UnitWithLessonsDto[];
}
