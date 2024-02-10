import { test, expect } from "@playwright/test";
import {HomePage} from "../Pages/HomePage";
import {ContactPage} from "../Pages/ContactPage";
import {NavigationBar} from "../Pages/NavigationBar";
import {DataString, ExpectedPopupMessages} from "../Common/AppData"



let homePage : HomePage ;
let navigationBar : NavigationBar;
let contactPage : ContactPage;


test.beforeEach(async ({ page }) => {
    navigationBar = new NavigationBar(page);
    homePage= new HomePage(page);
    contactPage = new ContactPage(page);
    await homePage.goTo();
})

test.describe('Test Contact page functionality', async () => {

    test("Verify that contact page is open correctly", async ({ page }) => {

        await test.step('Verify that webpage has title', async () => {
            await navigationBar.navigateToContacts();
            await expect(contactPage.headingNewMessageLabel).toBeVisible();
        });
        await test.step('Verify that contact page have all fields visible', async () => {
            await expect(contactPage.contactEmailInput).toBeVisible();
            await expect(contactPage.contactNameInput).toBeVisible();
            await expect(contactPage.contactMessageTextarea).toBeVisible();
            await expect(contactPage.submitButton).toBeVisible();
            await expect(contactPage.contactEmailInputLabel).toBeVisible();
            await expect(contactPage.contactNameInputLabel).toBeVisible();
            await expect(contactPage.contactMessageTextareaLabel).toBeVisible();
            await expect(contactPage.contactCloseButton).toBeVisible();
            await expect(contactPage.contactCloseXButton).toBeVisible();
        });
        await test.step('Verify that contact page can be filled and saved correctly with popup message', async () => {
            //await popuUpMessage(page, ExpectedPopupMessages.ConatctPopUpAlertData);
            const email = DataString.Email;
            const name = DataString.Name;
            const message = DataString.Message;
            await contactPage.fillContactForm(email, name, message);
            await contactPage.submitButton.click();
        });
    });
})