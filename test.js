// Example1- Taking a screenshot
const puppeteer = require("puppeteer");

async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://google.com');
    await page.setViewport({width: 1500, height:1000});
    await page.screenshot({path: 'google.png'});

    await browser.close();
}

getPic();