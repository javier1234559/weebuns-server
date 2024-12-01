"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = calculatePagination;
function calculatePagination(totalItems, paginationInput) {
    const { page, perPage } = paginationInput;
    const totalPages = Math.ceil(totalItems / perPage);
    return {
        totalItems: totalItems,
        currentPage: page,
        totalPages: totalPages,
        itemsPerPage: perPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}
//# sourceMappingURL=pagination.js.map