import { ApiProperty } from '@nestjs/swagger';

export class GetCourseDto {
  @ApiProperty({
    type: 'string',
    description: 'ID của space hiện tại để check trạng thái tham gia',
  })
  spaceId: string;
}
