import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";
import{ NavigationBar } from "../Pages/NavigationBar";
import { CartPage } from "../Pages/CartPage";
import { ProductPage } from "../Pages/ProductPage";
import { UrlExt , Headers , Devices } from "../Common/AppData"



let homePage : HomePage ;
let navigationBar : NavigationBar;


test.beforeEach(async ({ page }) => {
    navigationBar = new NavigationBar(page);
    homePage= new HomePage(page);
    await homePage.goTo();
})
test.describe('Test Home page functionality & Categories visibility ', async () => {

    test('Check Home Page Before', async () => {
        await test.step('Verify that webpage has title', async () => {
            await homePage.verifyCurrentURL(UrlExt.BASE_URL);
            await homePage.verifyWebPageTitle(Headers.PRODUCT_STORE);
        });
        await test.step('Verify homepage load', async () => {
            await expect(homePage.homePageElement).toBeVisible();
        });
        await test.step('Verify that categories text is displayed', async () => {
            await expect(homePage.categoriesHeadline).toBeVisible();
        });
        await test.step('Verify that next button on headline mobile pictures is working as expected', async () => {
                await homePage.verifyNextButton();
        });
    });

    test('Test navigating to each Category , Add devices to Cart And check visibility in each step', async ({page}) => {
        const cartPage = new CartPage(page);
        await test.step('Navigate To Phone Category Add device to Cart And check visibility', async () => {
            const productPage = new ProductPage(page, Devices.samasungGalaxySeven);
            await homePage.navigateToPhonesCategory();
            await homePage.selectProduct(Devices.samasungGalaxySeven);
            await productPage.verifyProductIsOpenAndAllFieldsAreVisible();
            await productPage.addProductToCart();
            await navigationBar.navigateToCart();
            await cartPage.verifyProductInCart(Devices.samasungGalaxySeven);
        });
        await test.step('Navigate To Laptops Category Add device to Cart And check visibility', async () => {
            const productPage = new ProductPage(page, Devices.macBookAir);
            await homePage.goTo();
            await homePage.navigateToLaptopsCategory();
            await homePage.selectProduct(Devices.macBookAir);
            await productPage.verifyProductIsOpenAndAllFieldsAreVisible();
            await productPage.addProductToCart();
            await navigationBar.navigateToCart();
            await cartPage.verifyProductInCart(Devices.macBookAir);
        });
        await test.step('Navigate To Monitors Category Add device to Cart And check visibility', async () => {
            const productPage = new ProductPage(page, Devices.ASUS);
            await homePage.goTo();
            await homePage.navigateToMonitorsCategory();
            await homePage.selectProduct(Devices.ASUS);
            await productPage.verifyProductIsOpenAndAllFieldsAreVisible();
            await productPage.addProductToCart();
            await navigationBar.navigateToCart();
            await cartPage.verifyProductInCart(Devices.ASUS);
        });
    });
    test('Verify that Categories gird is working as excepted on Next and previous button', async () => {
        await homePage.waitForProduct(Devices.samsungGalaxySix);
        let firstPageItems = await homePage.getProductTitles();
        await homePage.nextButton1.click();
        await homePage.waitForProduct("Apple monitor 24");
        let nextItems = await homePage.getProductTitles();
        expect(nextItems.length).toBeGreaterThan(0);
        expect(nextItems).not.toEqual(firstPageItems);
        await homePage.previousButton1.click();
        await homePage.waitForProduct(Devices.samasungGalaxySeven);
        let previousItems = await homePage.getProductTitles();
        expect(previousItems).not.toEqual(nextItems);
        await homePage.nextButton1.click();
        await homePage.waitForProduct(Devices.APPLE_MONITOR);
        let againNextItems = await homePage.getProductTitles();
        expect(nextItems.length).toBeGreaterThan(0);
        expect(previousItems).toEqual(againNextItems);
    });
})