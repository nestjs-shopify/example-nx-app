import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { LoggerService } from '../logger/custom.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: FastifyRequest = context?.switchToHttp()?.getRequest<FastifyRequest>();
        const response: FastifyReply = context?.switchToHttp()?.getResponse<FastifyReply>();
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                LoggerService.verbose(
                    `{${request?.url}, ${request?.method}} - ${response?.statusCode} : ${Date.now() - now} ms`,
                );
            }),
        );
    }
}
