import {Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';

// We use 'extends' to inherit the properties and methods of the BasePage class, allowing us to reuse the common functionality defined in BasePage.
export class LoginPage extends BasePage {  //LoginPage class that extends the BasePage class, allowing it to inherit the properties and methods of the BasePage class
    
    //Encapsulation: We define the locators as private properties, which means they can only be accessed within the LoginPage class. This encapsulation ensures that the locators are not directly accessible from outside the class, promoting better code organization and preventing unintended modifications.
    private readonly emailInput: Locator;  //Locator for the email input field
    private readonly passwordInput: Locator;  //Locator for the password input field
    private readonly loginButton: Locator;  //Locator for the login button
    private readonly errorMessage: Locator;  //Locator for the error message displayed on failed login attempts

    constructor(page: Page) {  //Constructor to initialize the locators and the page object
        super(page);  //Call the constructor of the BasePage class to initialize the page object
        
        /**
         * Action Workflow: Navigates to login page and executes the sign-in sequence 
         */
        this.emailInput = this.page.locator('[data-test='email']');  //Initialize the email input locator
        this.passwordInput = this.page.locator('[data-test='password']');  //Initialize the password input locator
        this.loginButton = this.page.locator('[data-test='login-submit']');  //Initialize the login button locator
        this.errorMessage = this.page.locator('[data-test='login-error']');  //Initialize the error message locator
    
    }

    async login(email: string, password: string): Promise<void> {  //Method to perform the login action, takes email and password as parameters
        
        await this.navigateTo('/auth/login');  //Navigate to the login page
        await this.fillInputField(this.emailInput, email);
        await this.fillInputField(this.passwordInput, password);
        await this.clickElement(this.loginButton);  //Click the login button
    }

    async getErrorMessage(): Promise<string> {  //Method to retrieve the error message text, returns a promise that resolves to the error message string
        
        await this.errorMessage.waitFor({state: 'visible'});  //Wait for the error message to be visible
        return await this.errorMessage.textContent() || '';  //Return the error message text, or an empty string if it's null
    }

}