import { ApiProperty } from '@nestjs/swagger';

import { Lesson } from '../entities/lesson.entity';

export class LessonResponseDto {
  @ApiProperty({
    type: Lesson,
  })
  lesson: Lesson;
}
