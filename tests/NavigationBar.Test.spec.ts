import { test, expect } from "@playwright/test";
import { NavigationBar } from "../Pages/NavigationBar";
import { CartPage } from "../Pages/CartPage";
import { HomePage } from "../Pages/HomePage";
import { AboutUsPage } from "../Pages/AboutUsPage";
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { ContactPage} from "../Pages/ContactPage";


//init PageObjects
let navigationBar : NavigationBar;
let homePage : HomePage;
let contactPage:ContactPage;
let cartPage : CartPage;
let aboutUsPage : AboutUsPage;
let registerPage : RegisterPage;
let loginPage : LoginPage;



test.beforeEach(async ({ page }) => {
    navigationBar = new NavigationBar(page);
    homePage= new HomePage(page);
    contactPage= new ContactPage(page);
    aboutUsPage= new AboutUsPage(page);
    cartPage = new CartPage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    await homePage.goTo();
})

test.describe('Test Navigation Bar functionality', async () => {
    test('Verify that each button points to the correct page & Correct Fields', async () => {
        await test.step('Navigate To Home', async () => {
            await navigationBar.navigateToHome();
        });
        await test.step('verifyAllNavBarLinksAreVisible', async () => {
            await navigationBar.verifyAllNavBarLinksAreVisible();
        });
        await test.step('Navigate To Contact', async () => {
            await navigationBar.navigateToContacts();
        });
        await test.step('Verify that contact fields are visible', async () => {
            await contactPage.ValidateAllfields();
        });
        await test.step('Navigate To About us', async () => {
            await navigationBar.navigateToAboutUs();
        });
        await test.step('Verify that About us fields are visible', async () => {
            await aboutUsPage.verifyThatAboutUsElementsAreVisible();
        });
        await test.step('Navigate To Cart', async () => {
            await navigationBar.navigateToCart();
        });
        await test.step('Verify that Cart fields are visible & URL Contain Cart', async () => {
            await cartPage.checkUrlExtension();
            await cartPage.verifyVisabilityAllElementsInCartPage();
            await navigationBar.navigateToHome();
        });
        await test.step('Navigate To Login', async () => {
            await navigationBar.navigateToLogin();
        });
        await test.step('Verify that Login fields are visible', async () => {
            await loginPage.ValidateLoginPageFieldsVisible();
        });
        await test.step('Navigate To SignUp', async () => {
            await navigationBar.navigateToSignUp();
        });
        await test.step('Verify that SignUp fields are visible', async () => {
            await registerPage.verifyThatAllElementsAreVisibleOnRegisterPage();
        });
    });
    })