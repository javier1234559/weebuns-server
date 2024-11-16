import { ApiProperty } from '@nestjs/swagger';

import { Course } from '../../course/entities/course.entity';
import { UnitProgress } from '../../unit-progress/entities/unit-progress.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';

export class CourseProgress {
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
    type: 'integer',
    format: 'int32',
  })
  completedWeight: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastAccessedAt: Date | null;
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
    type: () => UnitProgress,
    isArray: true,
    required: false,
  })
  unitProgress?: UnitProgress[];
}
