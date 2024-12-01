import { Prisma, PrismaClient } from '@prisma/client';
export declare const createSoftDeleteMiddleware: (prisma: PrismaClient) => (params: Prisma.MiddlewareParams, next: any) => Promise<any>;
