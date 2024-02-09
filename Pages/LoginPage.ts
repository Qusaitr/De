import { Page, Locator, expect } from "@playwright/test";


export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly closeButton: Locator;
    readonly loginHeading: Locator;
    readonly userNameLabel: Locator;
    readonly passwordLabel: Locator;
    readonly closeXButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#loginusername");
        this.passwordInput = page.locator("#loginpassword");
        this.loginButton = page.getByRole("button", { name: "Log in" });
        this.closeButton = page.getByLabel("Log in").getByText("Close");
        this.closeXButton = page.getByLabel("Log in").getByLabel("Close");
        this.loginHeading = page.getByRole("heading", { name: "Log in" });
        this.userNameLabel = page.getByLabel("Log in").getByText("Username:");
        this.passwordLabel = page.getByLabel("Log in").getByText("Password:");
    }

    async ValidateLoginPageFieldsVisible(){
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.closeButton).toBeVisible();
        await expect(this.loginHeading).toBeVisible();
        await expect(this.userNameLabel).toBeVisible();
        await expect(this.passwordLabel).toBeVisible();
        this.closeXButton.click();
    }
}