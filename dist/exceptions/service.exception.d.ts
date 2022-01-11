import { HttpException } from '@nestjs/common';
export declare class ServiceException extends HttpException {
    constructor(exception: any, statusCode?: any);
}
