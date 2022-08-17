import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // run before request is handled
    console.log("interceptor request");
    return next.handle().pipe(
      map((data: any) => {
        // run something before response is sent out
        console.log("interceptor response");
      })
    );
  }
}