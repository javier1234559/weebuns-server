import { ApiProperty } from '@nestjs/swagger';

import { Course } from '../../course/entities/course.entity';
import { UnitContent } from '../../unit-content/entities/unit-content.entity';
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
    type: 'string',
    nullable: true,
  })
  currentUnitContentId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  nextUnitId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  nextUnitContentId: string | null;
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
    type: 'string',
    isArray: true,
  })
  completedUnits: string[];
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  completedContents: string[];
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
    type: () => UnitContent,
    required: false,
    nullable: true,
  })
  currentContent?: UnitContent | null;
  @ApiProperty({
    type: () => UnitContent,
    required: false,
    nullable: true,
  })
  nextContent?: UnitContent | null;
}
