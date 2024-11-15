import { ApiProperty } from '@nestjs/swagger';

import { CourseContentDto } from 'src/models/course/dto/course-content.dto';

export class CourseUnitDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string', nullable: true })
  description: string | null;

  @ApiProperty({ type: 'number' })
  orderIndex: number;

  @ApiProperty({ type: [CourseContentDto] })
  contents: CourseContentDto[];
}
