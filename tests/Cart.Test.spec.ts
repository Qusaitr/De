import { test, expect } from "@playwright/test";
import { addProductToCart, getPriceFromCart} from "../ReusableMethod/Methods";
import { CartPage } from "../Pages/CartPage";
import { NavigationBar } from "../Pages/NavigationBar";
import {HomePage} from "../Pages/HomePage";
import {Devices , ExpectedPopupMessages } from "../Common/AppData"




let navigationBar : NavigationBar ;
let cartPage : CartPage ;
let homepage : HomePage ;


test.beforeEach(async ({ page }) => {
    navigationBar = new NavigationBar(page);
    cartPage = new CartPage(page);
    homepage = new HomePage(page);
    await homepage.goTo();
})

test.describe('Test Adding device to cart and place order functionality', async () => {
    test('Verify page Cart Url & Title', async () => {
        await test.step('Navigate To Cart page', async () => {
            await navigationBar.navigateToCart();
        });
        await test.step('Verify page URL', async () => {
            await cartPage.checkUrlExtension();
        });
        await test.step('Verify page Title', async () => {
            await expect(cartPage.pageTitleCart).toBeVisible();
        });
    });
    test('Test Adding device to cart and place order', async ({page}) => {

        await test.step('Add products to cart', async () => {
            await addProductToCart(page,Devices.samasungGalaxySeven);
            //await popuUpMessage(page , ExpectedPopupMessages.ProductAddedAlert);
            await addProductToCart(page, Devices.samsungGalaxySix);
            //await popuUpMessage(page , ExpectedPopupMessages.ProductAddedAlert);
        });

        await test.step('Navigate to cart', async () => {
            await navigationBar.navigateToCart();
        });

        await test.step('Verify product in cart', async () => {
            await cartPage.verifyProductInCart(Devices.samasungGalaxySeven);
            await cartPage.verifyProductInCart(Devices.samsungGalaxySix);
        });

        const priceOne = await getPriceFromCart(page,Devices.samasungGalaxySeven);
        const priceTwo = await getPriceFromCart(page, Devices.samsungGalaxySix);
        const expectedTotal = priceOne + priceTwo;

        await test.step('Verify All elements before type', async () => {
            await cartPage.GoToCartPage();
        });

        await test.step('Verify total amount before type in purchase', async () => {
            await cartPage.verifyTotalAmount(expectedTotal);
        });

        await test.step('Get products price from cart', async () => {

            //placeOrderWithRandomData includes verification data
            await cartPage.placeOrderWithRandomData(expectedTotal);
        });

        });

})
