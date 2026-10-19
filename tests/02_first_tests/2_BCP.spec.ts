import { chromium, Browser, BrowserContext, Page } from 'playwright';

async function runTest() {
    //1. heaviest operation, do it only once, and reuse the browser instance for all tests
    let browser: Browser = await chromium.launch({ headless: false });
    console.log("launched Browser successfully");

    //2. create context, this is a light operation, do it for each test- fresh session, cookies, cache, etc
    let context1: BrowserContext = await browser.newContext();
    console.log("context created"+ context1);

    let context2: BrowserContext = await browser.newContext();
    console.log("context created", context2);
    
    //3. Open page - a tab inside the context.
    let page: Page = await context1.newPage();
    console.log("page opened successfully");

    await page.goto("https://app.vwo.com/");
    console.log("title of the page is: " + await page.title());

    await page.close();
    await context1.close();
    await context2.close();
    await browser.close();
 }

runTest();