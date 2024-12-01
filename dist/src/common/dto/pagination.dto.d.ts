export declare class PaginationInputDto {
    page: number;
    perPage: number;
}
export declare class PaginationOutputDto {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
