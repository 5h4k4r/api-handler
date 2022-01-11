import { HttpException } from '@nestjs/common';

export class ServiceException extends HttpException {
    constructor(exception, statusCode = null) {
        super(exception, statusCode || 400);
    }
}