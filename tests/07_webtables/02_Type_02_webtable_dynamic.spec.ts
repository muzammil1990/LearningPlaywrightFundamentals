import { test, expect } from '@playwright/test';

test.describe('Web Table Tests', () => {


    test('test_web_table_login - structured extraction', async ({ page }) => {
        await page.goto('https://awesomeqa.com/webtable1.html');

        const rows = page.locator('table[summary="Sample Table"] tbody tr'); //css
        const rowCount = await rows.count();
        console.log(rowCount);

    // in PW nth(i) is zero based index, so first row is 0, second row is 1 and so on.
        for (let i = 0; i <= rowCount; i++) {
            const rowData = await rows.nth(i).locator('td').allInnerTexts();
            // console.log(`Row ${i + 1}:`, rowData); // check this line too    
            console.log(`Row ${i}:`, rowData);
        }



    })
});