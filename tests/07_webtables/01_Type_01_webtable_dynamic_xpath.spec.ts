import { test, expect } from "@playwright/test";

/*approach to automate webtable values using dynamic xpath

    1. First of all, go to the link of the web table, 
    2. Find the correct Helen banquet, 
    3. And then use a for loop to find the condtional element asked to find */


test("automate webtable values using dynamic xpath", async ({ page }) => {
    // urlUsed for this webtable concept: https://awesomeqa.com/webtable.html

    await page.goto("https://awesomeqa.com/webtable.html");

    const firstPartXpath = "//table[@id='customers']/tbody/tr[";
    const secondPartXpath = "]/td[";
    const thirdPartXpath = "]";

    const noOfRows = await page.locator("//table[@id='customers']/tbody/tr").count();
    const noOfColumns = await page.locator("//table[@id='customers']/tbody/tr[2]/td").count();

    console.log("No of Rows: " + noOfRows);
    console.log(`No of columns: ${noOfColumns}`);


    //first way to get the values of webtable using dynamic xpath
    for (let i = 2; i <= noOfRows; i++) {
        for (let j = 1; j <= noOfColumns; j++) {
            const dynamicXpath = `${firstPartXpath}${i}${secondPartXpath}${j}${thirdPartXpath}`;
            const cellValue = await page.locator(dynamicXpath).textContent(); //read textContent Vs innerText in notes;
            console.log(`Value at row ${i - 1} and column ${j} is: ${cellValue}`);
        }

        // I want application to pause when first row values are printed in console, 
        // so that i can verify the values in console with application values
        await page.pause();
    }

    //second way to get the values of webtable using dynamic xpath
    console.log("\n second way to get the values of webtable using dynamic xpath \n");

    for (let i = 2; i <= noOfRows; i++) {
        for (let j = 1; j <= noOfColumns; j++) {
            const dynamicXpath = `${firstPartXpath}${i}${secondPartXpath}${j}${thirdPartXpath}`;
            console.log(dynamicXpath);

            const data = await page.locator(dynamicXpath).innerText();
            console.log(data);

            //now find the country for Helen Bennett
            if (data.includes("Helen Bennett")) {  //includes is JS string method is used to check whether a string contains a specified substring or not. It returns true if the substring is found, otherwise it returns false.
                const countryPath = `${dynamicXpath}/following-sibling::td`;
                const country = await page.locator(countryPath).innerText();

                console.log("\n**-------**\n")
                console.log(`Helen Bennett's country is: ${country}\n`);
            }
        }
    }
});

/*

Equivalents
Tool	                Code
Playwright (TS)     const noOfRows = await page.locator("//table[@id='customers']/tbody/tr").count();
Selenium (Java)	    int noOfRows = driver.findElements(By.xpath("//table[@id='customers']/tbody/tr")).size();
WebdriverIO (JS)	const noOfRows = (await $$("//table[@id='customers']/tbody/tr")).length;


Full snippets

Selenium (Java)

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import java.util.List;

List<WebElement> rows = driver.findElements(By.xpath("//table[@id='customers']/tbody/tr"));
int noOfRows = rows.size();
System.out.println(noOfRows);


WebdriverIO (JS)

const rows = await $$("//table[@id='customers']/tbody/tr");
const noOfRows = rows.length;
console.log(noOfRows);
*/