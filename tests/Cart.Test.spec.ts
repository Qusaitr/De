import { test, expect } from "@playwright/test";
import {
    popuUpMessage,
    addProductToCart,
    getPriceFromCart,
    addItemToCartWithCategoryAndVerify,
} from "../ReusableMethod/Methods";


test("Verify that one item from home page can be selected and visible & delete them", async ({ page}) => {
    await page.goto("https://www.demoblaze.com/");
    await addItemToCartWithCategoryAndVerify(
        page,
        "CATEGORIES",
        "Samsung galaxy s7"
    );
    const deleteButton = "text=Delete";
    await page.click(deleteButton);
    const laptopChar = page.getByText("Samsung galaxy s7");
    await expect(laptopChar).toBeHidden();
});

test("Verify total in cart is calculated correctly", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
    await addProductToCart(page, "Samsung galaxy s7");
    await addProductToCart(page, "Nokia lumia 1520");
    await page.click("#cartur", { timeout: 10000 });
    const priceSamsung = await getPriceFromCart(page, "Samsung galaxy s7");
    const priceNokia = await getPriceFromCart(page, "Nokia lumia 1520");
    const expectedTotal = priceSamsung + priceNokia;
    const totalText = await page.textContent("#totalp");
    const actualTotal = totalText ? parseFloat(totalText) : 0;
    expect(expectedTotal).toBe(actualTotal);
});

test("Verify that Place order is working correctly", async ({ page,}) => {
    await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
    await addProductToCart(page, "Samsung galaxy s6");
    await addProductToCart(page, "Nexus 6");
    await page.waitForEvent("load");
    await page.click("#cartur", { timeout: 10000 });
    const priceSamsung = await getPriceFromCart(page, "Samsung galaxy s6");
    const priceNexus = await getPriceFromCart(page, "Nexus 6");
    const expectedTotal = priceSamsung + priceNexus;
    const totalText = await page.textContent("#totalp");
    const actualTotal = totalText ? parseFloat(totalText) : 0;
    expect.soft(expectedTotal).toBe(actualTotal);
    const buttonPlaceOrder = page.locator('button:has-text("Place Order")');
    await buttonPlaceOrder.click();
    const placeOrderNameTextbox = page.locator("#name");
    const placeOrderCountryTextbox = page.locator("#country");
    const placeOrderCityTextbox = page.locator("#city");
    const placeOrderCreditCardTextbox = page.locator("#card");
    const placeOrderMonthTextbox = page.locator("#month");
    const placeOrderYearTextbox = page.locator("#year");
    const firstNameUsed = "Mr.Test";
    await placeOrderNameTextbox.fill(firstNameUsed);
    await placeOrderCountryTextbox.fill("Israel");
    await placeOrderCityTextbox.fill("Tel Aviv");
    await placeOrderCreditCardTextbox.fill("01251475154");
    await placeOrderMonthTextbox.fill("01");
    await placeOrderYearTextbox.fill("2024");
    const buttonPurchase = page.locator('button[onclick="purchaseOrder()"]');
    await buttonPurchase.click({ timeout: 10000 });
    const thankYouMessageLocator = page.locator(
        'h2:has-text("Thank you for your purchase!")'
    );
    const amountPopup = page.locator("p.lead.text-muted");
    const namePopup = page.locator("p.lead.text-muted >> text=/Name: .+/");
    const tyMessageExpected = "Thank you for your purchase!";
    const thankYouMessageTextActual = await thankYouMessageLocator.textContent({
        timeout: 30000,
    });
    expect(tyMessageExpected).toEqual(thankYouMessageTextActual);
    const amountText = await amountPopup.textContent({ timeout: 30000 });
    // Initialize a variable to hold the parsed amount
    let amount = 0;
    if (amountText !== null) {
        const amountMatch = amountText.match(/Amount: (\d+) USD/);
        if (amountMatch) {
            amount = parseFloat(amountMatch[1]);
        }
    }

    const nameText = await namePopup.textContent();
    let name = "";

    if (nameText !== null) {
        const nameMatch = nameText.match(/Name: (.+?)(?=Date)/);
        if (nameMatch) {
            name = nameMatch[1].trim();
        }
    }

    expect(actualTotal).toBe(amount);
    expect(firstNameUsed).toBe(name);
});