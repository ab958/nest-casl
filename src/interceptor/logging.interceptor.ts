import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();

    const now = Date.now();
    return next
      .handle()
      .pipe();
  }
}