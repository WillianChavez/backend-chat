import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import fs from 'fs';

@Catch(HttpException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const getFiles = (files: Express.Multer.File[] | unknown | undefined) => {
      if (!files) return [];
      if (Array.isArray(files)) return files;
      return Object.values(files);
    };

    const filePaths = getFiles(request.files);

    for (const file of filePaths) {
      const path = file.path;
      fs.unlink(path, (err) => {
        if (err) {
          console.error(`Error deleting file: ${path}`);
        }
      });
    }

    fs.unlink(request.file.path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${request.file.path}`);
      }
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
