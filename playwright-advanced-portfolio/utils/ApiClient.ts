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

    /**
     * Authentication via API and returns the access token directly
     */

    public async getAuthToken(email: string, password: string): Promise<string> {
        const apiUrl = process.env.API_URL;
        const payload = {
            email: email,
            password: password
        };

        const response = await this.post(`${apiUrl}/users/login`, JSON.stringify(payload));

        if (!response.ok()) {
            throw new Error(`API authentication failed with status code ${response.status()}`);

        }
        const body = await response.json();

        return body.access_token;

    }

};