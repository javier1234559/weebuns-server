"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteExtension = void 0;
const client_1 = require("@prisma/client");
const softDeleteExtension = client_1.Prisma.defineExtension({
    name: 'softDelete',
    query: {
        essay: {
            async findMany({ args, query }) {
                args.where = {
                    AND: [args.where || {}, { NOT: { status: client_1.ContentStatus.deleted } }],
                };
                return query(args);
            },
            async findFirst({ args, query }) {
                args.where = {
                    AND: [args.where || {}, { NOT: { status: client_1.ContentStatus.deleted } }],
                };
                return query(args);
            },
            async findUnique({ args, query }) {
                const { where, ...rest } = args;
                return query({
                    ...rest,
                    action: 'findFirst',
                    where: {
                        ...where,
                        status: { not: client_1.ContentStatus.deleted },
                    },
                });
            },
            async delete({ args, query }) {
                return query({
                    ...args,
                    data: { status: client_1.ContentStatus.deleted },
                });
            },
            async deleteMany({ args, query }) {
                return query({
                    ...args,
                    data: { status: client_1.ContentStatus.deleted },
                });
            },
            async update({ args, query }) {
                const { where, data, ...rest } = args;
                return query({
                    ...rest,
                    data,
                    where: {
                        ...where,
                        status: { not: client_1.ContentStatus.deleted },
                    },
                });
            },
            async updateMany({ args, query }) {
                const { where, ...rest } = args;
                return query({
                    ...rest,
                    where: {
                        AND: [where || {}, { NOT: { status: client_1.ContentStatus.deleted } }],
                    },
                });
            },
            async count({ args, query }) {
                args.where = {
                    AND: [args.where || {}, { NOT: { status: client_1.ContentStatus.deleted } }],
                };
                return query(args);
            },
        },
    },
});
exports.softDeleteExtension = softDeleteExtension;
//# sourceMappingURL=soft-delete.extension.js.map