//Example3 - Download and save images into hardisk
const puppeteer = require("puppeteer");
const fs = require("fs");

const saveImageToDisk = async (url, filename) => {
    fetch(url)
    .then(res => {
        const dest = fs.createWriteStream(filename);
        res.body.pipe(dest)
    })
    .catch((err) => {
        console.log(err)
    })
}

const main = async () => {
    const browser = await puppeteer.launch({headless: false,args: ['--start-fullscreen']});
    const page = await browser.newPage();
    // await page.setViewport({width: 1920, height: 1080});
    await page.goto("https://www.google.com/search?channel=fs&client=ubuntu&q=pinterest+rose+images",{waitUntil: 'networkidle0'});
    
    const photos = await page.evaluate(() => {
        let allImagesPath = [];
        let images = document.querySelectorAll('.eA0Zlc');
        for(const img of images) {
            let imagePath = img.getAttribute('data-lpage');
            allImagesPath.push(imagePath);

            //got to image link and save it
            // const imagePage = await page.goto(imagePath);
            // await fs.writeFile(imagePath.split("/").pop(), await imagePage.buffer());
        }
        
        return allImagesPath;
    });
    console.log('result--',photos);

    // photos.map((image) => {
    //     let filename = `./images/${image}`
    //     saveImageToDisk(image.src, filename)
    // })

    for (const p of photos) {
    //     //got to image link and save it
    //     const imagePage = await page.goto(p);
    //     // await fs.writeFile(p.split("/").pop(), await imagePage.buffer());
    //     console.log('h-',p.split("/").pop());

    //     //   fs.createWriteStream('1.png', await imagePage.buffer(), function (err) {
    //     //     if (err) {
    //     //         return console.log('err----',err);
    //     //     } else {
    //     //         console.log('Saved');
    //     //         process.exit();
    //     //     }
    //     //   });

        const imagefileDL = await page.goto(p);
        fs.writeFile('a.jpeg', await imagefileDL.buffer(), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
        
    }

    browser.close();
}

main();