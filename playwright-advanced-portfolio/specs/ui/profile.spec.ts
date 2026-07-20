import {test, expect} from '@playwright/test';
import {APIClient} from '../../utils/ApiClient';

test.describe('Profile Dashboard - Hybrid Auth Acceleration', () => {

    test('should access profile page instantly by injection API token', async({page,request}) => {
        const apiClient = new APIClient(request);

        // 1. Fetch the authentication token via direct API call
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
       

        if (!email || !password) {
            throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables!");
        }
        
        const token = await apiClient.getAuthToken(email, password);
        // 3. Inject the JWT token into the browser's local storage state
        await page.addInitScript((jwtToken) => {
            localStorage.setItem('auth-token', jwtToken);

        }, token);

         

        // 4. navigate directly to the account page
        await page.goto('/account');

        // 5. verify we are successfully logged in and looking at profile
        await expect(page).toHaveURL(/.*account/);

        const pageTitle = page.locator('[data-test="page-title"]');
        await expect(pageTitle).toBeVisible();
        await expect(pageTitle).toContainText('Profile');


    });

});
