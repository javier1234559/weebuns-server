import { ApiProperty } from '@nestjs/swagger';

import { Course } from '../../course/entities/course.entity';
import { Space } from '../../space/entities/space.entity';

export class SpaceCourse {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  spaceId: string;
  @ApiProperty({
    type: 'string',
  })
  courseId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  joinedAt: Date;
  @ApiProperty({
    type: () => Space,
    required: false,
  })
  space?: Space;
  @ApiProperty({
    type: () => Course,
    required: false,
  })
  course?: Course;
}
