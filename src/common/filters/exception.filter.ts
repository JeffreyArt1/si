import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const managedResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      path: request.url,
    };

    if (exception['response'] && exception['response'].message) {
      managedResponse['message'] = exception['response'].message;
    }
    return response.status(status).json(managedResponse);
  }
}

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch({ message }: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return response.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
