
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap((data) => {
                // Handle errors and format responses
                if (data instanceof HttpException) {
                    const status = data.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
                    const response = data.getResponse();
                    throw new HttpException(
                        {
                            statusCode: status,
                            timestamp: new Date().toISOString(),
                            path: context.switchToHttp().getRequest().url,
                            message: response['message'] || 'An error occurred',
                        },
                        status,
                    );
                }

                // Format success responses
                return {
                    statusCode: HttpStatus.OK,
                    timestamp: new Date().toISOString(),
                    path: context.switchToHttp().getRequest().url,
                    data,
                };
            }),
        );
    }
}
