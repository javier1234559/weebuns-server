import { ApiProperty } from '@nestjs/swagger';

import { ICourseProgress } from 'src/models/course-progress/course-progress.interface';

import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';

export class CourseProgress implements ICourseProgress {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  completedWeight: number;
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  courseId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  currentUnitId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  currentLessonId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  nextUnitId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  nextLessonId: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastAccessedAt: Date | null;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  completedUnits: string[];
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  completedLessons: string[];
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
  @ApiProperty({
    type: () => Course,
    required: false,
  })
  course?: Course;
  @ApiProperty({
    type: () => Unit,
    required: false,
    nullable: true,
  })
  currentUnit?: Unit | null;
  @ApiProperty({
    type: () => Unit,
    required: false,
    nullable: true,
  })
  nextUnit?: Unit | null;
  @ApiProperty({
    type: () => Lesson,
    required: false,
    nullable: true,
  })
  currentLesson?: Lesson | null;
  @ApiProperty({
    type: () => Lesson,
    required: false,
    nullable: true,
  })
  nextLesson?: Lesson | null;
}
