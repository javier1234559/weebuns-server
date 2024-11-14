import { ApiProperty } from '@nestjs/swagger';

import { ProficiencyLevel } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { CourseCreatorDto } from 'src/models/course/dto/course-creator.dto';
import { CourseUnitDto } from 'src/models/course/dto/course-unit.dto';

export class CourseResponseDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string', nullable: true })
  description: string | null;

  @ApiProperty({ type: 'string', nullable: true })
  thumbnailUrl: string | null;

  @ApiProperty({ enum: ProficiencyLevel })
  level: ProficiencyLevel;

  @ApiProperty({ type: 'number', nullable: true })
  price: Decimal | null;

  @ApiProperty({ type: 'number' })
  totalWeight: number;

  @ApiProperty({ type: 'boolean' })
  isPublished: boolean;

  @ApiProperty({ type: 'string' })
  createdAt: Date;

  @ApiProperty({ type: CourseCreatorDto })
  creator: CourseCreatorDto;

  @ApiProperty({ type: [CourseUnitDto] })
  units: CourseUnitDto[];

  @ApiProperty({ type: 'boolean' })
  is_joined: boolean;
}
