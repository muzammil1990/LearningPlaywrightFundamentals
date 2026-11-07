import { test, expect } from "@playwright/test";

test("access multiple elements", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    // first way to get all the elements
    const rightPanelLinks: string[] = await page.locator("a.list-group-item").allInnerTexts();
    console.log(rightPanelLinks);

    for (const linkText of rightPanelLinks) {
        if (linkText === "Forgotten Password") {
            await page.getByText(linkText).first().click();
            await page.pause();
        }
    }

    
    //second way to get all the elements
    const rightPanelLinks2 = await page.locator("a.list-group-item").all();
    for(const link of rightPanelLinks2) {
        console.log(await link.getAttribute("href"));
        if(await link.getAttribute("href") === "#forgotten-password"){
            await link.click();
            await page.pause();
        }
    }

})