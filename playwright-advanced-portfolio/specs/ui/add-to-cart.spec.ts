import {test, expect} from '@playwright/test';
import {DataReader} from '../../utils/DataReader';

interface ProductItem {

    productName: string;
    quantity: number;
    expectedPrice: number;

}

test.describe('Shopping cart - Excel Data Driven', () => {

    //Read products data directly from the excel sheet
    const shoppingList = DataReader.getExcelData<ProductItem>('products.xlsx');    

    test('Add items from Excel sheet to cart', async({page}) => {
        await page.goto('/');

        for (const item of shoppingList) {
            //1.serach or click on the product card matching the excel name
            const productCard = await page.locator('.card')
                                    .filter({hasText: item.productName});
            await productCard.click();

            // Adjust quantity if greater than 1
            if (item.quantity > 1) {
                const quantityInput = page.locator('[data-test="quantity"]');
                await quantityInput.fill(item.quantity.toString());

            }

            //click on add to cart
            await page.locator("#btn-add-to-cart").click();
            await expect(page.getByText(" Product added to shopping cart. ")).toBeVisible();

            //return to home catolog for the next item
            await page.goto('/');                    

        };

        //verify total items in the cart badge
        const cartCount = await page.locator("#lblCartCount");
        await expect(cartCount).toBeVisible();


    });


});