import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class CourseProgressUserIdCourseIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  courseId: string;
}

@ApiExtraModels(CourseProgressUserIdCourseIdUniqueInputDto)
export class ConnectCourseProgressDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    type: CourseProgressUserIdCourseIdUniqueInputDto,
    required: false,
    nullable: true,
  })
  userId_courseId?: CourseProgressUserIdCourseIdUniqueInputDto;
}
