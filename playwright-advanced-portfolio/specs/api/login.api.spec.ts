import { test, expect } from '@playwright/test';
import {APIClient} from "../../utils/ApiClient";
import {DataReader} from "../../utils/DataReader";

interface UserTestData {
    email: string;
    password: string;
}

test.describe("Authentication - API Validation", () => {
    const testCases = DataReader.getCsvData<UserTestData>('users.csv');

    testCases.forEach((record, index) => {

        const email = record.email?.trim() || ' ';
        const password = record.password?.trim() || '';

        test(`API Should reject API login with invalid credentials with status 401 for: #${index+1}: ${email}`, async({request}) => {

            // 1. Intialize our API client using Playwright's narratice request context
            const apiClient = new APIClient(request);
            const apiUrl = process.env.API_URL;
            // 2. Define the payload matching the authentication expectations
            const payload = {
                username: email,
                password: password,

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
    });

})