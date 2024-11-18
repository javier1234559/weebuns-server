import { ApiProperty } from '@nestjs/swagger';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { User } from 'src/models/user/entities/user.entity';

export class CourseWithJoinStatus {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty()
  isJoined: boolean;

  @ApiProperty({ nullable: true })
  joinedAt: Date | null;

  @ApiProperty({ type: () => CourseProgress, nullable: true })
  progress: CourseProgress | null;

  @ApiProperty({ type: () => User })
  creator: User;
}

export class SpaceCoursesAllResponseDto {
  @ApiProperty({ type: [CourseWithJoinStatus] })
  data: CourseWithJoinStatus[];

  @ApiProperty()
  pagination: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
