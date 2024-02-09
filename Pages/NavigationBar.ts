import { Page, Locator, expect } from "@playwright/test";

class NavigationBar {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly contactsLink: Locator;
    readonly aboutUsLink: Locator;
    readonly cartLink: Locator;
    readonly loginLink: Locator;
    readonly signUpLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole("link", { name: "Home" });
        this.contactsLink = page.getByRole("link", { name: "Contact" });
        this.aboutUsLink = page.getByRole("link", { name: "About us" });
        this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
        this.loginLink = page.getByRole("link", { name: "Log in" });
        this.signUpLink = page.getByRole("link", { name: "Sign up" });
    }
    private linkByName(name: string) {
        return this.page.getByRole("link", { name });
    }
    async navigateTo(linkName: string) {
        const link = this.linkByName(linkName);
        await expect(link).toBeVisible();
    }

    async verifyAllNavBarLinksAreVisible() {
        const links = ["Home", "Contact", "About us", "Cart", "Log in", "Sign up"];
        for (const linkName of links) {
            await expect(this.linkByName(linkName)).toBeVisible();
        }
    }

    async navigateToHome() {
        await this.homeLink.click();
    }
    async navigateToContacts() {
        await this.contactsLink.click();
    }

    async navigateToAboutUs() {
        await this.aboutUsLink.click();
    }

    async navigateToCart() {
        await this.cartLink.click();
    }

    async navigateToLogin() {
        await this.loginLink.click();
    }

    async navigateToSignUp() {
        await this.signUpLink.click();
    }
}
export { NavigationBar };