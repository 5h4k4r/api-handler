"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const common_1 = require("@nestjs/common");
class NotFoundException extends common_1.HttpException {
    constructor() {
        super("Unknown error", 400);
    }
}
exports.NotFoundException = NotFoundException;
