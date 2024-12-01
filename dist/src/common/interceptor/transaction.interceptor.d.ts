import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
export declare const TRANSACTION_KEY = "useTransaction";
export declare const UseTransaction: () => import("@nestjs/common").CustomDecorator<string>;
export declare class TransactionInterceptor implements NestInterceptor {
    private readonly prisma;
    private readonly reflector;
    constructor(prisma: PrismaService, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
