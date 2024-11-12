import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class SpaceCourseSpaceIdCourseIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  spaceId: string;
  @ApiProperty({
    type: 'string',
  })
  courseId: string;
}

@ApiExtraModels(SpaceCourseSpaceIdCourseIdUniqueInputDto)
export class ConnectSpaceCourseDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    type: SpaceCourseSpaceIdCourseIdUniqueInputDto,
    required: false,
    nullable: true,
  })
  spaceId_courseId?: SpaceCourseSpaceIdCourseIdUniqueInputDto;
}
