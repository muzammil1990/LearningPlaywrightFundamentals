import { test, expect } from '@playwright/test';

test('Verify first TC', async ({page}) => {  //browser, context, page

    await page.goto("https://app.thetestingacademy.com/playwright/ttacart/");

})