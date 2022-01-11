"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceException = void 0;
const common_1 = require("@nestjs/common");
class ServiceException extends common_1.HttpException {
    constructor(exception, statusCode = null) {
        super(exception, statusCode || 400);
    }
}
exports.ServiceException = ServiceException;
