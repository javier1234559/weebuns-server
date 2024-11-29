import { ApiProperty } from '@nestjs/swagger';

import { Lesson } from '../entities/lesson.entity';

export class GetLessonResponseDto {
  @ApiProperty({
    type: Lesson,
  })
  lesson: Lesson;
}
