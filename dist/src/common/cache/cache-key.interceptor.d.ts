import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
export declare class CacheKeyInterceptor implements NestInterceptor {
    private readonly cacheManager;
    private readonly logger;
    constructor(cacheManager: Cache);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
