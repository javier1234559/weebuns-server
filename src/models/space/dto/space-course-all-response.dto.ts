import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { User } from 'src/models/user/entities/user.entity';

export class CourseWithJoinStatus {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({ nullable: true })
  thumbnailUrl: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  minLevel: string;

  @ApiProperty()
  maxLevel: string;

  @ApiProperty({ type: [String] })
  topics: string[];

  @ApiProperty()
  courseType: string;

  @ApiProperty()
  isPremium: boolean;

  @ApiProperty()
  totalWeight: number;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

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
  pagination: PaginationOutputDto;
}
