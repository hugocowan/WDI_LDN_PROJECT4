const Part = require('../models/part');
const Scraper = require('../models/scraper');
const puppeteer = require('puppeteer');

const scrapePricing = async (url) => {

    const blockedResourceTypes = ['image', 'media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];
    const skippedResources = ['quantserve', 'adzerk', 'doubleclick', 'adition', 'exelator', 'sharethrough',
        'cdn.api.twitter', 'google-analytics', 'googletagmanager', 'google', 'fontawesome', 'facebook',
        'analytics', 'optimizely', 'clicktale', 'mixpanel', 'zedo', 'clicksor', 'tiqcdn'];

    const browser = await puppeteer.launch(
        // {headless: false},
        {args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--single-process',
        ]}
    );
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', request => {
        const requestUrl = request._url.split('?')[0].split('#')[0];
        if (
            blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
            skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
        ) {
            request.abort();
        } else {
            request.continue();
        }
    });

    await page.goto(url, {
        timeout: 25000,
        waitUntil: 'networkidle2',
    })
        .catch(err => {
            console.log('Page navigation error:', err);
            return null;
        });

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

function createRoute(req, res, next) {

    Part
        .findById(req.params.id)
        .then(async part => {
                let scrapeData = {};

                await scrapePricing(part.link)
                    .then(price => {

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

                Scraper
                    .create(scrapeData)
                    .then(scrape => {
                        part.scrapes = (scrape.id);
                        part.save();
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

            if (timeLeft <= 0) {
                console.log('Time\'s up, scraping.');
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
            }
        })
        .catch(next);
}

module.exports = {
    show: showRoute,
    create: createRoute
};