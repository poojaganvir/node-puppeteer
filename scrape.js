// Example2- Scrape some data
const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    // await page.waitFor(1000);

    //scrape
    
    // await page.click('li.col-xs-6:nth-child(1) > article:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)');

    const result = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('.product_pod');

        for(var ele of elements) {
            let title = ele.childNodes[5].innerText;
            let price = ele.childNodes[7].innerText;
            data.push({title, price});
        }
        return data;
    //     let title = document.querySelector('h1').innerText;
    //     let price = document.querySelector('.price_color').innerText;
        
    //     return {title, price};
    });
    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
});