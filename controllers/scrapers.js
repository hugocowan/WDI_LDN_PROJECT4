const Part = require('../models/part');
const Scraper = require('../models/scraper');
const puppeteer = require('puppeteer');

const scrapePricing = async (url) => {
    const browser = await puppeteer.launch(
        // {headless: false}
        { args: ['--no-sandbox'] }
    );
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
        const priceBlock = document.getElementById('priceblock_ourprice');
        const usedPriceBlock = document.getElementById('olp-used');

        if (!priceBlock && !usedPriceBlock) {
            return null;
        }
        else if (!priceBlock) {
            const usedPrice = usedPriceBlock.children[0].innerText.split('from');
            return usedPrice[usedPrice.length - 1].substr(2);
        }
        return priceBlock.innerText.substr(1);
    });

    browser.close();
    return result;
};

//There could be a problem with res.json happening before the scrape happens.
//Also the index will scrape one page for every part. Could be too much crawling/take ages.

function createRoute(req, res, next) {

    console.log('hi!', req.params.id);

    Part
        .findById(req.params.id)
        .then(async part => {
                let scrapeData = {};

                await scrapePricing(part.link)
                    .then(price => {

                        console.log('price:', price);

                        if (price === null) {
                            scrapeData = null;
                            return;
                        }

                        scrapeData.data = [];
                        scrapeData.data.push({
                            price,
                            createdAt: new Date(),
                        });
                        scrapeData.lastScrape = new Date();
                        scrapeData.part = part.id;
                        scrapeData.url = part.link;
                    })
                    .catch(next);

                if (scrapeData === null) {
                    return res.json('Error: scraping failed to find a price.');
                }

                console.log('We made a new scrape!', scrapeData, scrapeData.lastScrape, typeof scrapeData.lastScrape);

                Scraper
                    .create(scrapeData)
                    .then(scrape => {
                        part.scrapes = (scrape.id);
                        part.save();
                        console.log('scraping successful!', scrapeData);
                        res.json(scrape);
                    })
                    .catch(next);
        })
        .catch(next);

}

function showRoute(req, res, next) {
    Scraper
        .findById(req.params.id)
        .then(async scrape => {
            const currentTime = new Date();
            const timeLeft = scrape.lastScrape.getTime() - currentTime.getTime() + 1.8e+6;

            // if (!scrape.lastScrape) {
            //     scrape.lastScrape = new Date();
            //     scrape.save();
            //     return res.json(scrape);
            // }

            if (timeLeft <= 0) {
                await scrapePricing(scrape.url)
                    .then(price => {
                        const data = { price, createdAt: new Date() };
                        scrape.data.push(data);
                        scrape.lastScrape = data.createdAt;
                        scrape.save();
                    })
                    .catch(next);
            } else {
                console.log(`There\'s ${(timeLeft/60000)} minutes left till it\'s scraping time.`);
                res.json(scrape);
            }
        })
        .catch(next);
}

module.exports = {
    show: showRoute,
    create: createRoute
};