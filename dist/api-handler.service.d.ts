export declare class ApiHandlerService {
    static sendRawRequest(method: string, address: string, data?: any, headers?: any, requestId?: any): Promise<any>;
    static sendUrlEncodedRequest(method: string, address: string, data?: any, headers?: any, requestId?: any): Promise<any>;
    private static flattenData;
}
