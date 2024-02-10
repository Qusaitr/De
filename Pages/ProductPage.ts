import { Page, Locator, expect } from "@playwright/test";

class ProductPage {
    readonly page: Page;
    productName: string;
    private product_Link: Locator;
    private product_Heading: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;
    readonly productImage: Locator;
    readonly productDescription: Locator;

    constructor(page: Page, productName: string) {
        this.page = page;
        this.productName = productName;
        this.product_Link = page.locator(`a:has-text("${productName}")`);
        this.product_Heading = page.getByRole("heading", { name: productName });
        this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
        this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
        this.productImage = page.locator("#imgp img");
        this.productDescription = page.getByText("Product description");
    }

    async verifyProductIsOpenAndAllFieldsAreVisible() {
        const elements: Locator[] = [
            this.product_Heading,
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