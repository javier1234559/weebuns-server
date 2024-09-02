import { PaginationOutputDto } from 'src/common/dto/pagination.dto';

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationOutputDto;
}
