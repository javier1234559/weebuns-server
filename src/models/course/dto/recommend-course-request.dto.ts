import { ApiProperty } from '@nestjs/swagger';

export class RecommendCourseRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'ID của space hiện tại để lấy thông tin target và level',
  })
  spaceId: string;

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

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Tìm kiếm theo tên khóa học',
  })
  search?: string;
}
