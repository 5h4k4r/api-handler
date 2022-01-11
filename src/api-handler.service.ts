import { HttpException, Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { URLSearchParams } from 'url';
import { NotFoundException } from './exceptions/not-found.exception';
import { ServiceException } from './exceptions/service.exception';

@Injectable()
export class ApiHandlerService {
    public static async sendRawRequest(method: string, address: string, data: any = {}, headers: any = null, requestId: any = null): Promise<any> {
        const http = axios.default;
        let response = null;

        try {
            const options = {
                headers: headers,
                auth: headers?.auth,
            };

            if (method === 'get') {
                response = !headers ? await http.get(address) : await http.get(address, options);
            } else if (['delete', 'head', 'options'].includes(method)) {
                response = await http[method](address, { data, headers: options.headers, auth: options.auth });
            } else {
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
        } catch (exception: any) {
            console.log('----------------------------------------');
            console.log(`sendRawRequestException: ${requestId}`, {
                method,
                address,
                data,
                headers,
                exception: exception.response ?? exception,
            });

            if (exception.response && exception.response.data) {
                throw new ServiceException(exception.response.data, exception.response.status);
            }

            throw new NotFoundException();
        }

        return response;
    }

    public static async sendUrlEncodedRequest(method: string, address: string, data: any = {}, headers: any = null, requestId: any = null): Promise<any> {
        const http = axios.default;
        const params = new URLSearchParams();
        const flattenData = ApiHandlerService.flattenData(data, true);
        let response = null;

        for (const key in flattenData) {
            params.append(key, flattenData[key]);
        }

        try {
            const options = {
                headers: headers,
                auth: headers?.auth,
            };

            if (method === 'get') {
                response = !headers ? await http.get(address) : await http.get(address, options);
            } else if (['delete', 'head', 'options'].includes(method)) {
                response = await http[method](address, { data: params, headers: options.headers, auth: options.auth });
            } else {
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
        } catch (exception: any) {
            console.log('----------------------------------------');
            console.log(`sendUrlEncodedRequestException: ${requestId}`, {
                method,
                address,
                data,
                headers,
                exception: exception.response ?? exception,
            });

            if (exception.response && exception.response.data) {
                throw new ServiceException(exception.response.data, exception.response.status);
            }

            throw new NotFoundException();
        }

        return response;
    }

    private static flattenData(data, isFlat = false): any {
        const flattenData = {};

        for (const key in data) {
            if (typeof data[key] === 'object') {
                const result = ApiHandlerService.flattenData(data[key]);

                for (const innerKey in result) {
                    if (isFlat) {
                        flattenData[`${key}${innerKey}`] = result[innerKey];
                    } else {
                        flattenData[`[${key}]${innerKey}`] = result[innerKey];
                    }
                }
            } else {
                if (isFlat) {
                    flattenData[`${key}`] = data[key];
                } else {
                    flattenData[`[${key}]`] = data[key];
                }
            }
        }

        return flattenData;
    }
}
