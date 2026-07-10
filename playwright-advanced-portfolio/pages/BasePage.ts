import {Page, Locator} from '@playwright/test',

export abstract class BasePage {            //Abstract class to be extended by all page objects

    protected readonly page: Page;                 //Page object to be used by all page objects and protected allows childpages to see this, readonly keeps it safe from modification

    constructor(page: Page) {                      //Constructor to initialize the page object

        this.page = page;                          //Assign the page object to the class property
    }

    /**
     * Reusable navigation wrapper using the baseURL from the playwright.config.ts file
     * @param path - The path to navigate to, relative to the baseURL
     */
    async navigateTo(path: string): Promise<void> {  //Navigate to a specific path on the baseURL, returns a promise that resolves when navigation is complete
        
        await this.page.goto(path);             //Use the page object to navigate to the specified path
    }

    /**
     * Reusable Actionthat guarantees visibilty before clicking on a locator. This is a wrapper around the click() method of the Locator class.
     * @param locator - The locator to click on
     */
    async clickElement(locator: Locator): Promise<void> {  //Click on a specific locator, returns a promise that resolves when the click is complete
        
        await locator.waitFor({state: 'visible'});  //Wait for the locator to be visible before clicking on it
        await locator.click();                      //Click on the locator
    }

    /**
     * Reusable Action that guarantees visibility before typing into a locator. This is a wrapper around the fill() method of the Locator class.
     * @param locator - The locator to type into
     * @param text - The text to type into the locator
     */
    async fillInputField(locator: Locator, text: string): Promise<void> {  //Type into a specific locator, returns a promise that resolves when the typing is complete
        await locator.waitFor({state: 'visible'});  //Wait for the locator to be visible before typing into it
        await locator.fill(text);                    //Type into the locator
    }



}