import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/common/prisma/prisma.service';
export declare class ActivityInterceptor implements NestInterceptor {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly fixedPaths;
    private readonly pathPatterns;
    private isTrackablePath;
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    private trackActivity;
}
