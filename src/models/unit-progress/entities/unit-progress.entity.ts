import { ApiProperty } from '@nestjs/swagger';

import { UnitContentProgress } from 'src/models/unit-content-progress/entities/unit-content-progress.entity';
import { Unit } from 'src/models/unit/entities/unit.entity';

import { CourseProgress } from '../../course-progress/entities/course-progress.entity';

export class UnitProgress {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  courseProgressId: string;
  @ApiProperty({
    type: 'string',
  })
  unitId: string;
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
    type: 'boolean',
  })
  isCompleted: boolean;
  @ApiProperty({
    type: () => CourseProgress,
    required: false,
  })
  courseProgress?: CourseProgress;
  @ApiProperty({
    type: () => Unit,
    required: false,
  })
  unit?: Unit;
  @ApiProperty({
    type: () => UnitContentProgress,
    isArray: true,
    required: false,
  })
  contentProgress?: UnitContentProgress[];
}
