import { test, expect } from '@playwright/test';
import {APIClient} from "../../utils/ApiClient";

test.describe("Authentication - API Validation", () => {

    test('Should reject API login with invalid credentials', async({request}) => {

        // 1. Intialize our API client using Playwright's narratice request context
        const apiClient = new APIClient(request);
        const apiUrl = process.env.API_URL;
        // 2. Define the payload matching the authentication expectations
        const payload = {
            username: 'wronguser@portfolio.com',
            password: 'invalidPassword@123'

        };

        // 3. Send the POST request to login endpoint
        const response = await apiClient.post(`${apiUrl}/users/login`, JSON.stringify(payload));

        // 4. Validate the response status code (401 means Unauthorized)
        expect(response.status()).toBe(401);

        // 5. Parse the body text to ensuer it sends the correct structural message
        const responseBody = await response.json();
        console.log('API Error Response: ', responseBody);
        expect(responseBody.error).toContain('Invalid login request');
        

    });


})