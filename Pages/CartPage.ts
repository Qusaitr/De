import { Page, Locator, expect } from "@playwright/test";
import { popuUpMessage } from "../ReusableMethod/Methods";
import { UrlExt} from "../Common/AppData"


class CartPage {
    readonly page: Page;
    readonly pageTitleCart: Locator;
    readonly deleteButton: Locator;
    readonly purchaseButton: Locator;
    readonly totalAmount: Locator;
    readonly placeOrderButtonCartPage: Locator;
    readonly placeOrderPopupHeading: Locator;
    readonly placeOrderPopupTotal: Locator;
    readonly placeOrderPopupLabelName: Locator;
    readonly placeOrderPopupLabelCountry: Locator;
    readonly placeOrderPopupTextboxCountry: Locator;
    readonly placeOrderPopupLabelCity: Locator;
    readonly placeOrderPopupTextboxCity: Locator;
    readonly placeOrderPopupLabelCreditCard: Locator;
    readonly placeOrderPopupTextboxCreditCard: Locator;
    readonly placeOrderPopupLabelMonth: Locator;
    readonly placeOrderPopupTextboxMonth: Locator;
    readonly placeOrderPopupLabelYear: Locator;
    readonly placeOrderPopupTextboxYear: Locator;
    readonly placeOrderPopupXCloseButton: Locator;
    readonly placeOrderPopupPurchaseButton: Locator;
    readonly placeOrderPopupCloseButton: Locator;
    readonly pageTotalCart: Locator;
    readonly pageProductsGridPicture: Locator;
    readonly pageProductsGridTitle: Locator;
    readonly pageProducGridPrice: Locator;
    readonly pageProducGridX: Locator;
    readonly placeOrderPopupTextboxName: Locator;
    readonly thankYouMessageLocator: Locator;
    readonly popupAmount: Locator;
    readonly popupName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitleCart = page.getByRole("heading", { name: "Products" });
        this.pageTotalCart = page.getByRole("heading", { name: "Total" });
        this.pageProductsGridPicture = page.getByRole("cell", { name: "Pic" });
        this.pageProductsGridTitle = page.getByRole("cell", { name: "Title" });
        this.pageProducGridPrice = page.getByRole("cell", { name: "Price" });
        this.pageProducGridX = page.getByRole("cell", { name: "x" });
        this.deleteButton = page.getByRole("link", { name: "Delete" });
        this.purchaseButton = page.locator('button:has-text("Place Order")');
        this.totalAmount = page.locator("#totalp");
        this.placeOrderButtonCartPage = page.getByRole("button", {
            name: "Place Order",
        });
        this.placeOrderPopupHeading = page.getByRole("heading", {
            name: "Place order",
        });
        this.placeOrderPopupTotal = page.getByText("Total:");
        this.placeOrderPopupLabelName = page.getByText("Name:", { exact: true });
        this.placeOrderPopupTextboxName = page.getByLabel("Name:", { exact: true });
        this.placeOrderPopupLabelCountry = page.getByText("Country:");
        this.placeOrderPopupTextboxCountry = page.getByLabel("Country:");
        this.placeOrderPopupLabelCity = page.getByText("City:");
        this.placeOrderPopupTextboxCity = page.getByLabel("City:");
        this.placeOrderPopupLabelCreditCard = page.getByText("Credit card:");
        this.placeOrderPopupTextboxCreditCard = page.getByLabel("Credit card:");
        this.placeOrderPopupLabelMonth = page.getByText("Month:");
        this.placeOrderPopupTextboxMonth = page.getByLabel("Month:");
        this.placeOrderPopupLabelYear = page.getByText("Year:");
        this.placeOrderPopupTextboxYear = page.getByLabel("Year:");
        this.placeOrderPopupXCloseButton = page
            .getByLabel("Place order")
            .getByLabel("Close");
        this.placeOrderPopupPurchaseButton = page.getByRole("button", {
            name: "Purchase",
        });
        this.placeOrderPopupCloseButton = page
            .getByLabel("Place order")
            .getByText("Close");
        this.thankYouMessageLocator = page.locator(
            'h2:has-text("Thank you for your purchase!")'
        );
        this.popupAmount = page.locator("p.lead.text-muted");
        this.popupName = page.locator("p.lead.text-muted >> text=/Name: .+/");
    }

    async verifyVisabilityAllElementsOnPopupPlaceOrderPage() {
        const elementsToVerifyVisible: Locator[] = [
            this.placeOrderPopupHeading,
            this.placeOrderPopupTotal,
            this.placeOrderPopupLabelName,
            this.placeOrderPopupTextboxName,
            this.placeOrderPopupLabelCountry,
            this.placeOrderPopupTextboxCountry,
            this.placeOrderPopupLabelCity,
            this.placeOrderPopupTextboxCity,
            this.placeOrderPopupLabelCreditCard,
            this.placeOrderPopupTextboxCreditCard,
            this.placeOrderPopupLabelMonth,
            this.placeOrderPopupTextboxMonth,
            this.placeOrderPopupLabelYear,
            this.placeOrderPopupTextboxYear,
            this.placeOrderPopupXCloseButton,
            this.placeOrderPopupPurchaseButton,
            this.placeOrderPopupCloseButton,
        ];

        for (const element of elementsToVerifyVisible) {
            await expect(element).toBeVisible();
        }
    }

    async verifyVisabilityAllElementsInCartPage() {
        const elementsToVerifyVisible: Locator[] = [
            this.pageTitleCart,
            this.pageTotalCart,
            this.pageProductsGridPicture,
            this.pageProductsGridTitle,
            this.pageProducGridPrice,
            this.pageProducGridX,
        ];

        for (const element of elementsToVerifyVisible) {
            await expect(element).toBeVisible();
        }
    }
    async verifyProductInCart(productName: string) {
        const productLocator = this.page.getByRole("cell", { name: productName });
        await expect(productLocator).toBeVisible({ timeout: 50000 });
    }
    async verifyIsthereAnyProductInCart(productName: string) {
        await this.page.waitForLoadState("networkidle");
        const productLocators = this.page.getByRole("cell", { name: productName });
        const count = await productLocators.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyDialogPopupLoginMessageWrongCredentials() {
        await popuUpMessage(this.page, "Please fill out Name and Creditcard.");
    }

    async verifyProductRemoved(productName: string) {
        const productLocator = this.page.getByRole("cell", { name: productName });
        await expect(productLocator).toBeHidden();
    }
    async removeProductFromCart(productName: string) {
        await this.deleteButton.click();
        await this.verifyProductRemoved(productName);
    }

    async verifyTotalAmount(expectedTotal: number) {
        const totalText = await this.totalAmount.textContent();
        const actualTotal = totalText ? parseFloat(totalText) : 0;
        expect(expectedTotal).toBe(actualTotal);
    }

    async generateRandomOrderData() {
        return {
            name: "Test",
            country: "Test",
            city: "Test",
            card: "01235426545564",
            month: "01",
            year: "1970",
        };
    }

    async fillData() {
        const orderData = await this.generateRandomOrderData();
        await this.placeOrderPopupTextboxName.fill(orderData.name);
        await this.placeOrderPopupTextboxCountry.fill(orderData.country);
        await this.placeOrderPopupTextboxCity.fill(orderData.city);
        await this.placeOrderPopupTextboxCreditCard.fill(orderData.card);
        await this.placeOrderPopupTextboxMonth.fill(orderData.month);
        await this.placeOrderPopupTextboxYear.fill(orderData.year);
        return orderData;
    }

    async getTextContent(locator, regex) {
        const text = await locator.textContent();
        return text && regex ? (text.match(regex) || [])[1] : text;
    }

    async placeOrderWithRandomData(expectedTotal: number) {
        await this.placeOrderButtonCartPage.click();
        const orderData = await this.fillData();
        await this.placeOrderPopupPurchaseButton.click();
        await expect(this.thankYouMessageLocator).toContainText(
            "Thank you for your purchase!"
        );
        const amountFromPopup =
            parseFloat(
                await this.getTextContent(this.popupAmount, /Amount: (\d+) USD/)
            ) || 0;
        const nameFromPopup =
            (await this.getTextContent(this.popupName, /Name: (.+?)(?=Date)/)) || "";

        expect(expectedTotal).toBe(amountFromPopup);
        expect(nameFromPopup).toBe(orderData.name);
    }
    async checkUrlExtension() {
        // Get the current URL
        const currentUrl = this.page.url();
        // Check if the current URL contains the expected extension
        expect(currentUrl).toContain(UrlExt.YOUR_CART_PAGE_URL);
    }
}
export { CartPage };