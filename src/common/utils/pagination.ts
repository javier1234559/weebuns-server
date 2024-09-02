import {
  PaginationInputDto,
  PaginationOutputDto,
} from 'src/common/dto/pagination.dto';

export function calculatePagination(
  totalItems: number,
  paginationInput: PaginationInputDto,
): PaginationOutputDto {
  const { page, perPage } = paginationInput;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    totalItems,
    currentPage: page,
    totalPages,
    itemsPerPage: perPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
