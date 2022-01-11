import { Module } from '@nestjs/common';
import { ApiHandlerService } from './api-handler.service';

@Module({
    imports: [],
    providers: [ApiHandlerService],
    exports: [ApiHandlerService],
})
export class ApiHandlerModule {
}
