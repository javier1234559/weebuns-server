import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class UserCourseUserIdCourseIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  courseId: string;
}

@ApiExtraModels(UserCourseUserIdCourseIdUniqueInputDto)
export class ConnectUserCourseDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    type: UserCourseUserIdCourseIdUniqueInputDto,
    required: false,
    nullable: true,
  })
  userId_courseId?: UserCourseUserIdCourseIdUniqueInputDto;
}
