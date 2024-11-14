import { ApiProperty } from '@nestjs/swagger';

import { ProficiencyLevel } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { CourseCreatorDto } from 'src/models/course/dto/course-creator.dto';

export class SpaceCourseDto {
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

  @ApiProperty({ type: 'boolean' })
  is_joined: boolean;

  @ApiProperty({ type: 'string', nullable: true })
  joined_at: Date | null;
}
