import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResMes = exception.getResponse();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // tslint:disable-next-line: no-console
      // console.error(exception);
    }

    let errorResponse;
    if (typeof errorResMes === 'string' || errorResMes instanceof String) {
      errorResponse = {
        statusCode: status,
        error:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception.message || null
            : 'Internal server error',
      };
    } else {
      errorResponse = {
        ...errorResMes,
      };
    }

    // This is for REST petitions
    if (request) {
      const error = {
        ...errorResponse,
        path: request.url,
        method: request.method,
      };

      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(error),
        'ExceptionFilter',
      );

      response.status(status).json(errorResponse);
    }
  }
}
