"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var ApiHandlerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiHandlerService = void 0;
const common_1 = require("@nestjs/common");
const axios = __importStar(require("axios"));
const url_1 = require("url");
const not_found_exception_1 = require("./exceptions/not-found.exception");
const service_exception_1 = require("./exceptions/service.exception");
let ApiHandlerService = ApiHandlerService_1 = class ApiHandlerService {
    static async sendRawRequest(method, address, data = {}, headers = null, requestId = null) {
        var _a;
        const http = axios.default;
        let response = null;
        try {
            const options = {
                headers: headers,
                auth: headers === null || headers === void 0 ? void 0 : headers.auth,
            };
            if (method === 'get') {
                response = !headers ? await http.get(address) : await http.get(address, options);
            }
            else if (['delete', 'head', 'options'].includes(method)) {
                response = await http[method](address, { data, headers: options.headers, auth: options.auth });
            }
            else {
                response = await http[method](address, data, options);
            }
            response = response && response.data ? response.data : null;
            console.log('----------------------------------------');
            console.log(`sendRawRequestResponse: ${requestId}`, {
                method,
                address,
                data,
                headers,
                response,
            });
        }
        catch (exception) {
            console.log('----------------------------------------');
            console.log(`sendRawRequestException: ${requestId}`, {
                method,
                address,
                data,
                headers,
                exception: (_a = exception.response) !== null && _a !== void 0 ? _a : exception,
            });
            if (exception.response && exception.response.data) {
                throw new service_exception_1.ServiceException(exception.response.data, exception.response.status);
            }
            throw new not_found_exception_1.NotFoundException();
        }
        return response;
    }
    static async sendUrlEncodedRequest(method, address, data = {}, headers = null, requestId = null) {
        var _a;
        const http = axios.default;
        const params = new url_1.URLSearchParams();
        const flattenData = ApiHandlerService_1.flattenData(data, true);
        let response = null;
        for (const key in flattenData) {
            params.append(key, flattenData[key]);
        }
        try {
            const options = {
                headers: headers,
                auth: headers === null || headers === void 0 ? void 0 : headers.auth,
            };
            if (method === 'get') {
                response = !headers ? await http.get(address) : await http.get(address, options);
            }
            else if (['delete', 'head', 'options'].includes(method)) {
                response = await http[method](address, { data: params, headers: options.headers, auth: options.auth });
            }
            else {
                response = await http[method](address, params, options);
            }
            response = response && response.data ? response.data : null;
            console.log('----------------------------------------');
            console.log(`sendUrlEncodedRequestResponse: ${requestId}`, {
                method,
                address,
                data,
                headers,
                response,
            });
        }
        catch (exception) {
            console.log('----------------------------------------');
            console.log(`sendUrlEncodedRequestException: ${requestId}`, {
                method,
                address,
                data,
                headers,
                exception: (_a = exception.response) !== null && _a !== void 0 ? _a : exception,
            });
            if (exception.response && exception.response.data) {
                throw new service_exception_1.ServiceException(exception.response.data, exception.response.status);
            }
            throw new not_found_exception_1.NotFoundException();
        }
        return response;
    }
    static flattenData(data, isFlat = false) {
        const flattenData = {};
        for (const key in data) {
            if (typeof data[key] === 'object') {
                const result = ApiHandlerService_1.flattenData(data[key]);
                for (const innerKey in result) {
                    if (isFlat) {
                        flattenData[`${key}${innerKey}`] = result[innerKey];
                    }
                    else {
                        flattenData[`[${key}]${innerKey}`] = result[innerKey];
                    }
                }
            }
            else {
                if (isFlat) {
                    flattenData[`${key}`] = data[key];
                }
                else {
                    flattenData[`[${key}]`] = data[key];
                }
            }
        }
        return flattenData;
    }
};
ApiHandlerService = ApiHandlerService_1 = __decorate([
    (0, common_1.Injectable)()
], ApiHandlerService);
exports.ApiHandlerService = ApiHandlerService;
