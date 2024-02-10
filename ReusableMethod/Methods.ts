import { expect, Page, Dialog, Locator } from "@playwright/test";


export async function addProductToCart(page: Page, productName: string) {
    await page.click(`.card-title a:has-text("${productName}")`);
    const linkAddCart = page.getByText("Add to cart");
    await linkAddCart.click({ force: true });
    await page.click("a.navbar-brand#nava" ,{timeout:10000});
}

export async function getPriceFromCart(
    page: Page,
    productName: string
): Promise<number> {
    const productRow = page.locator(`tr.success:has-text("${productName}")`);
    const priceText = await productRow.locator("td:nth-child(3)").textContent();
    if (priceText !== null) {
        return parseFloat(priceText);
    } else {
        return 0;
    }
}

//export async function popuUpMessage(page, expectedMessage: string) : Promise<void> {
//     page.once("dialog", async (dialog: Dialog) => {
//         const text = dialog.message();
//         expect(text).toBe(expectedMessage);
//         await dialog.accept();
//     });
// }


export async function verifyNextAndPreviousButton(page: Page, buttonSelector: Locator, expectedSlides: Array<{ src: string; alt: string }>): Promise<void> {
    for (const { src, alt } of expectedSlides) {
        const activeImageSelector = "div.carousel-item.active img.d-block.img-fluid";
        const image = page.locator(activeImageSelector);
        await expect(image).toHaveAttribute("src", src);
        await expect(image).toHaveAttribute("alt", alt);
        // Click the button to move to the next/previous slide
        await buttonSelector.click();
        // Adjust timeout as needed for slide transition
        await page.waitForTimeout(1000);
    }
}
