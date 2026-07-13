import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import {DataReader} from '../../utils/DataReader';

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

    //test('Authentication - Data Driven UI Validation', () => {
        //Fetch our parsed data array dynamically using the utility we built
        const testData = DataReader.getCsvData<{username: string; password: string; expectedError: string}> ('users.csv');

        // Loop through every row of data to dynamically generate tests
        testData.forEach((row) => {
            test(`Should reject login for user with data driven validation: ${row.username}`, async({page}) =>{

                const loginPage = new LoginPage(page);

                //Execute the action using data straight from the current loop row
                loginPage.login(row.username, row.password);

                //Extract and validate the UI error message response
                const errorText = await loginPage.getErrorMessage();
                expect(errorText).toContain(row.expectedError);
            });

        });


    //});

});