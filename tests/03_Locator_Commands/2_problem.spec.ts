import {test, expect} from '@playwright/test';

test('verify signup with error message', async ({page})=> { //BCP
    await page.goto("https://vwo.com/free-trial/");
   
   let inputbox =  page.locator("#free-trial-step1-email");
   await inputbox.fill("blabla");

   await page.locator("#free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox").click();
   await page.locator("free-trial-step1-gdpr-consent-checkboxcu-gdpr-consent-checkbox").click();
     
   await page.locator("button[data-qa='page-su-submit']").first().click();


})
