import {Page , Locator , expect} from "@playwright/test";


class AboutUsPage {

    readonly page:Page;
    readonly aboutUsTitle:Locator;
    readonly closeButton:Locator;
    readonly closeXButton:Locator;


    constructor(page:Page) {
        this.page=page;
        this.aboutUsTitle=page.getByRole("heading" ,{
            name:"About us",
            exact:true
        });
        this.closeButton=page
            .locator("#videoModal")
            .getByText("Close",{exact:true});
        this.closeXButton=page.locator("#videoModal").getByLabel("Close");

    }

    async verifyThatAboutUsElementsAreVisible() {
        const elements = [this.aboutUsTitle, this.closeButton, this.closeXButton];
        for (const element of elements) {
            await expect(element).toBeVisible();
        }
        this.closeXButton.click();
    }


}
export {AboutUsPage}