import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class RemoveFieldInterceptor implements NestInterceptor {
    private readonly FIELDS_TO_REMOVE;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private removeFields;
}
