const Part = require('../models/part');
const Scraper = require('../models/scraper');
const puppeteer = require('puppeteer');

const scrapePricing = async (url) => {
    console.log(url);
    const browser = await puppeteer.launch(
        // {headless: false}
    );
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
        return document.getElementById('priceblock_ourprice').innerText.substr(1);
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
                        scrapeData.data = {};
                        scrapeData.data.price = price;
                        scrapeData.data.createdAt = new Date();
                        scrapeData.lastScrape = scrapeData.createdAt;
                        scrapeData.part = part.id;
                        scrapeData.url = part.link;
                    })
                    .catch(() => scrapeData.scrapedPrice = null);

                console.log(scrapeData);

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
            // const timeLeft = scrape.lastScrape.getTime() + 1.8e+6 - currentTime.getTime();
            if (scrape.lastScrape.getTime() + 1.8e+6 <= currentTime.getTime()) {
                await scrapePricing(scrape.url)
                    .then(price => {
                        const data = { price, createdAt: new Date() };
                        scrape.data.push(data);
                        scrape.lastScrape = data.createdAt;
                        scrape.save();
                    })
                    .catch(next);
            } else {
                // console.log(`There\'s ${new Date(timeLeft)} left till it\'s scraping time.`);
                res.json(scrape);
            }
        })
        .catch(next);
}

module.exports = {
    show: showRoute,
    create: createRoute
};