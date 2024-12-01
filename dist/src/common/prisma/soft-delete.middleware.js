"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSoftDeleteMiddleware = void 0;
const client_1 = require("@prisma/client");
const createSoftDeleteMiddleware = (prisma) => {
    return async (params, next) => {
        if (params.model !== 'Essay') {
            return next(params);
        }
        switch (params.action) {
            case 'findUnique':
                return next({
                    ...params,
                    action: 'findFirst',
                    args: {
                        ...params.args,
                        where: {
                            ...params.args.where,
                            NOT: { status: client_1.ContentStatus.deleted },
                        },
                    },
                });
            case 'findMany':
                if (!params.args?.where?.status) {
                    params.args = {
                        ...params.args,
                        where: {
                            ...params.args?.where,
                            NOT: { status: client_1.ContentStatus.deleted },
                        },
                    };
                }
                break;
            case 'update':
                const exist = await prisma.essay.findFirst({
                    where: {
                        id: params.args.where.id,
                        NOT: { status: client_1.ContentStatus.deleted },
                    },
                });
                if (!exist) {
                    throw new Error('Record not found or already deleted');
                }
                return next({
                    ...params,
                    args: {
                        ...params.args,
                        where: { id: params.args.where.id },
                    },
                });
            case 'delete':
                return next({
                    ...params,
                    action: 'update',
                    args: {
                        ...params.args,
                        data: { status: client_1.ContentStatus.deleted },
                    },
                });
            case 'deleteMany':
                return next({
                    ...params,
                    action: 'updateMany',
                    args: {
                        where: params.args?.where,
                        data: { status: client_1.ContentStatus.deleted },
                    },
                });
        }
        return next(params);
    };
};
exports.createSoftDeleteMiddleware = createSoftDeleteMiddleware;
//# sourceMappingURL=soft-delete.middleware.js.map