import { ApiProperty } from '@nestjs/swagger';

import { Course } from 'src/models/course/entities/course.entity';
import { LessonWithoutContent } from 'src/models/lesson/dto/lesson-without-content.dto';

export class SimplifiedNoteDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string', nullable: true })
  spaceId: string | null;

  @ApiProperty({ type: 'string' })
  lessonId: string;

  @ApiProperty({ type: 'string' })
  content: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty({ type: 'boolean' })
  isBookmarked: boolean;

  @ApiProperty({ type: () => LessonWithoutContent })
  lesson?: LessonWithoutContent;

  @ApiProperty({ type: () => Course })
  course?: Course;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;
}
