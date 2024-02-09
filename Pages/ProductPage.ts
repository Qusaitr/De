import { Page, Locator, expect } from "@playwright/test";

class ProductPage {
    readonly page: Page;
    productName: string;
    private _productLink: Locator; // Now a static locator, initialized in the constructor
    private _productHeading: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;
    readonly productImage: Locator;
    readonly productDescription: Locator;

    constructor(page: Page, productName: string) {
        this.page = page;
        this.productName = productName;
        this._productLink = page.locator(`a:has-text("${productName}")`);
        this._productHeading = page.getByRole("heading", { name: productName });
        this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
        this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
        this.productImage = page.locator("#imgp img");
        this.productDescription = page.getByText("Product description");
    }

    async verifyProductIsOpenAndAllFieldsAreVisible() {
        const elements: Locator[] = [
            this._productHeading,
            this.productImage,
            this.productDescription,
            this.addToCartButton,
        ];

        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    async addProductToCart() {
        await this.addToCartButton.click();
        await this.page.waitForTimeout(1000);
    }
}
export { ProductPage };