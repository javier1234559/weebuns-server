import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ type: 'number' })
  total: number;

  @ApiProperty({ type: 'number' })
  page: number;

  @ApiProperty({ type: 'number' })
  perPage: number;

  @ApiProperty({ type: 'number' })
  totalPages: number;
}
