import { HttpException } from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor() {
        super("Unknown error", 400);
    }
}
