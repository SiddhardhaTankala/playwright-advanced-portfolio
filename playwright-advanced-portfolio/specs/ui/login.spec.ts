import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';

test.describe('Authentication - UI Validation', () => {     //Group related tests together for better organization and reporting

    test('Should display an error message for invalid login credentials', async ({page}) => {       //Test case to validate error message for invalid login credentials

        //1. Instantiate our Page object Model for the Login Page, passing in the Playwright page object to the constructor. This allows the LoginPage class to interact with the browser page.
        const loginPage = new LoginPage(page);  
        
        // 2. Perform the action workflow using our encapsulated method
        await loginPage.login('invalid@example.com', 'wrongpassword');

        // 3. Extract the error message string from the UI
        const errorText = await loginPage.getErrorMessage();

        // 4. Assert that the validation message contains the correct industry text
        expect(errorText).toContain("Invalid email or password");
    });

});