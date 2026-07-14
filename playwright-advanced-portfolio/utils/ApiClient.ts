import {APIRequestContext, APIResponse} from '@playwright/test';

export class APIClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;

    }

    /**
     * Executes a standard HTTP POST request to a given endpoint.
     * @param endpoint - The targeted API path (e.g. '/api/login')
     * @param payload - The JSON object payload containing data
     */

    public async post(endpoint: string, payload: string): Promise<APIResponse> {
        const response = await this.request.post(endpoint, {
            data: payload,
            headers: {'Content-Type':'application/json'}

        });

        return response;
    }


};