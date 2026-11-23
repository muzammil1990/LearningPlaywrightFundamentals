import { test, expect, Page } from '@playwright/test';

async function getCountryByName(page: Page, name: string) {
  const country = page
    .getByTestId('employees-tbody')
    .getByRole('row')
    .filter({ has: page.getByRole('cell', { name, exact: true }) })
    .locator('td[data-col="country"]');

  await expect(page.getByTestId('employees-tbody').getByRole('row').first()).toBeVisible();

  /*
country.count() =	Counts matching cells on the current page. It gives 0 if the name isn't here,
                    1 if it is.

  So !(await country.count()) means "the name was not found on this page". 
  It's a short way of writing (await country.count()) === 0, which may be easier to read:
  */
//   while ((await country.count()) === 0 && (await page.getByTestId('next-page').isEnabled()))
  while (!(await country.count()) && (await page.getByTestId('next-page').isEnabled())) {
    const before = await page.getByTestId('page-summary').innerText();
    await page.getByTestId('next-page').click();
    await expect(page.getByTestId('page-summary')).not.toHaveText(before);
  }

  // if (await country.count() === 0 )
    if (!(await country.count())) // !0 means 1; found the country hence skips the if block and returns the country name. !1 means 0; country not found hence returns null.
        return null;

  return country.innerText();
}

test('find country by employee name', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');

    const countryName = await getCountryByName(page, 'Yuki Sato')

    console.log(`Yuki Sato's country: ${countryName}`);
    expect(countryName).toBe('Japan');

    await page.pause();

});


/*
    FULL EXPLANATION OF THE LOGIC WRITTEN ABOVE

Both lines use one idea: country.count() returns a number, the number of matching Country cells on the current page.

Reading !(await country.count())
Piece	            What it does
country.count() 	Counts matching cells on the current page. It gives 0 if the name isn't here, 1 if it is.

await	            count() is asynchronous, so we wait for the number.
!	                "Not". In JavaScript, 0 counts as false, so !0 is true. Any other number counts as true, so !1 is false.

So !(await country.count()) means "the name was not found on this page". It's a short way of writing (await country.count()) === 0, which may be easier to read:

typescript
while ((await country.count()) === 0 && (await page.getByTestId('next-page').isEnabled()))

The while line in plain English

typescript
while (name NOT found on this page  AND  Next button is enabled)

&& means both conditions must be true for the loop to run again:

Name found on this page?	Next enabled?	    Loop runs again?	    Why
No	                        Yes	                 Yes	            Keep searching, go to the next page
Yes	                        Yes	                 No	                Found it, stop
No                      	No	                 No	                Last page and still not found, stop
Yes	                        No	                 No             	Found it, stop

Inside the loop, it clicks Next and waits for the new page to load, then the condition is checked again.

The if line

typescript
if (!(await country.count())) 
    return null;

This runs after the loop ends. The loop can end for two different reasons: 
either we found the name, or we reached the last page without finding it. 

The if tells these apart by counting once more:

    -Count is 0 means not found, so return null.
    -Count is 1 means found, so skip the if and continue to return country.innerText();.


Walkthrough

Name = Camila Lopez (page 3)

Page 1: count is 0 and Next is enabled, so the loop runs and clicks Next.
Page 2: count is 0 and Next is enabled, so the loop runs and clicks Next.
Page 3: count is 1, so the loop stops.
The if sees a count of 1 and doesn't return null.
The function returns Mexico.

Name = Unknown Person

Pages 1 and 2: not found and Next is enabled, so the loop keeps going.
Page 3: count is 0, but Next is disabled, so the loop stops.
The if sees a count of 0 and returns null.

Without the if, the last line would try to read text from a cell that doesn't exist, and Playwright would wait about 30 seconds and then throw a timeout error instead of giving you a clean null
*/