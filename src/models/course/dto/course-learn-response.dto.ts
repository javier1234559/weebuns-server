import { ApiProperty } from '@nestjs/swagger';

import { ContentStatus } from '@prisma/client';

export class LessonLearnDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  orderIndex: number;

  @ApiProperty()
  isPremium: boolean;

  @ApiProperty()
  isRequired: boolean;

  @ApiProperty({ enum: ContentStatus })
  status: ContentStatus;

  @ApiProperty()
  lessonWeight: number;
}

// Create class for Unit
export class UnitLearnDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  orderIndex: number;

  @ApiProperty()
  isPremium: boolean;

  @ApiProperty({ type: [LessonLearnDto] })
  lessons: LessonLearnDto[];
}

export class CourseLearnDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  thumbnailUrl?: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  minLevel: string;

  @ApiProperty()
  maxLevel: string;

  @ApiProperty({ type: [String] })
  topics: string[];

  @ApiProperty()
  courseType: string;

  @ApiProperty()
  isPremium: boolean;

  @ApiProperty()
  totalWeight: number;

  @ApiProperty({ enum: ContentStatus })
  status: ContentStatus;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [UnitLearnDto] })
  units: UnitLearnDto[];
}

// Main Response DTO
export class CourseLearnResponseDto {
  @ApiProperty({ type: CourseLearnDto })
  course: CourseLearnDto;
}
