"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuery = exports.paginationQuery = exports.softDeleteQuery = exports.isPublishedQuery = exports.notDeletedQuery = void 0;
const client_1 = require("@prisma/client");
exports.notDeletedQuery = {
    deletedAt: null,
};
exports.isPublishedQuery = {
    status: client_1.ContentStatus.published,
};
const softDeleteQuery = (id) => ({
    where: { id },
    data: { deletedAt: new Date() },
});
exports.softDeleteQuery = softDeleteQuery;
const paginationQuery = (page, perPage) => {
    if (!page || !perPage)
        return {};
    return {
        skip: (page - 1) * perPage,
        take: perPage,
    };
};
exports.paginationQuery = paginationQuery;
const searchQuery = (search, fields) => {
    if (!search)
        return {};
    return {
        OR: fields.map((field) => ({
            [field]: { contains: search, mode: 'insensitive' },
        })),
    };
};
exports.searchQuery = searchQuery;
//# sourceMappingURL=prisma-queries.helper.js.map