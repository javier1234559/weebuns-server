import { ApiProperty } from '@nestjs/swagger';

import { BaseSpaceDto } from 'src/models/course/dto/base-space.dto';

export class GetCoursesRequestDto extends BaseSpaceDto {
  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Tìm kiếm theo title hoặc description',
  })
  search?: string;

  @ApiProperty({
    type: 'number',
    required: false,
    description: 'Số trang, mặc định = 1',
  })
  page?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    description: 'Số item trên trang, mặc định = 10',
  })
  perPage?: number;
}
