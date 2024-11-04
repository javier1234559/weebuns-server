import { EssayStatus, Prisma, PrismaClient } from '@prisma/client';

export const createSoftDeleteMiddleware = (prisma: PrismaClient) => {
  return async (params: Prisma.MiddlewareParams, next: any) => {
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
              NOT: { status: EssayStatus.deleted },
            },
          },
        });

      case 'findMany':
        if (!params.args?.where?.status) {
          params.args = {
            ...params.args,
            where: {
              ...params.args?.where,
              NOT: { status: EssayStatus.deleted },
            },
          };
        }
        break;

      case 'update':
        // Kiểm tra tồn tại bằng prisma instance
        const exist = await prisma.essay.findFirst({
          where: {
            id: params.args.where.id,
            NOT: { status: EssayStatus.deleted },
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
            data: { status: EssayStatus.deleted },
          },
        });

      case 'deleteMany':
        return next({
          ...params,
          action: 'updateMany',
          args: {
            where: params.args?.where,
            data: { status: EssayStatus.deleted },
          },
        });
    }

    return next(params);
  };
};
