import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import {DataReader} from '../../utils/DataReader';

interface LoginTestData {
    username: string;
    password: string;
    expected_result: string;

}

test.describe("UI Authentication - Data Driven", () => {

    const testCases = DataReader.getCsvData<LoginTestData>('users.csv');
    


    testCases.forEach((record, index) => {
        const email = record.username?.trim() || ' ';
        const password = record.password?.trim() || ' ';
        const expectedResult = record.expected_result.trim() || 'failure';
        
        

        test(`Login test #${index+1}: ${email} (${expectedResult})`, async({page}) => {
            const loginPage = new LoginPage(page);
            const path: string = process.env.BASE_URL || '';

            await loginPage.navigateTo(path);
            await loginPage.login(email, password);

            if (expectedResult === 'success') {
                await expect(page).toHaveURL('https://practicesoftwaretesting.com/admin/dashboard');
                await expect(page.getByText("Sales over the years")).toBeVisible();
                await page.locator('[data-test="nav-home"]').click();
                await expect(page.getByRole('heading', { name: 'Filters' })).toBeVisible();
            
            } else {
                const errorMessage = await loginPage.getErrorMessage();
                expect(errorMessage).toBeTruthy();

            }


        });
    });




});