const Part = require('../models/part');
const puppeteer = require('puppeteer');

const scrapePricing = async (url) => {
    const browser = await puppeteer.launch(
        // {headless: false}
        );
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
        const price = document.getElementById('priceblock_ourprice').innerText.substr(1);
        return price;
    });

    browser.close();
    return result;
};

function scrape(req, part) {
    let scrapeData = {};
    scrapePricing(req.body.link)
        .then((price) => {
            console.log('scraping successful!');
            scrapeData.scrapedPrice = price;
            scrapeData.lastScrape = new Date();
        })
        .catch(() => scrapeData.scrapedPrice = null);

    Object.assign(part, scrapeData);
    part.save();
}

//There could be a problem with res.json happening before the scrape happens.
//Also the index will scrape one page for every part. Could be too much crawling/take ages.


function indexRoute(req, res, next) {
    Part
        .find()
        .populate({
            path: 'comments createdBy',
            populate: {path: 'createdBy'}
        })
        .exec()
        .then((parts) => {

            // parts.forEach(part => {
            //     const currentTime = new Date();
            //     if (!part.lastScrape || part.lastScrape.getTime() + 1.8e+6 <= currentTime.getTime()) {
            //         scrape(req, part);
            //     }
            // });

            res.json(parts);
        })
        .catch(next);
}

function showRoute(req, res, next) {
    Part
        .findById(req.params.id)
        .populate({
            path: 'comments createdBy',
            populate: { path: 'createdBy' }
        })
        .then(part => {

            Part
                .find({ 'type': part.type })
                .then(parts => {
                    const currentTime = new Date();
                    if (!part.lastScrape || part.lastScrape.getTime() + 1.8e+6 <= currentTime.getTime()) {
                        scrape(req, part);
                    }

                    res.json([part, ...parts]);
                })
                .catch(next);
        })
        .catch(next);
}

async function createRoute(req, res, next) {
    await scrapePricing(req.body.link)
        .then((price) => {
            req.body.scrapedPrice = price;
            req.body.lastScrape = new Date();
        })
        .catch(() => req.body.scrapedPrice = null);
    req.body.createdBy = req.currentUser;
    console.log(req.body);
    Part
        .create(req.body)
        .then(part => res.status(201).json(part))
        .catch(next);
}

function updateRoute(req, res, next) {
    req.body.createdBy = req.currentUser;
    Part
        .findById(req.params.id)
        .then(part => {
            const currentTime = new Date();
            let scrapeData = {};
            if (!part.lastScrape || part.lastScrape.getTime() + 1.8e+6 <= currentTime.getTime()) {
                scrapePricing(req.body.link)
                    .then((price) => {
                        scrapeData.scrapedPrice = price;
                        scrapeData.lastScrape = new Date();
                    })
                    .catch(() => scrapeData.scrapedPrice = null);
            }

            return Object.assign(part, req.body, scrapeData);
        })
        .then(part => part.save())
        .then(part => res.json(part))
        .catch(next);
}

function deleteRoute(req, res, next) {
    Part
        .findById(req.params.id)
        .then(part => {
            return part.remove();
        })
        .then(() => res.sendStatus(204))
        .catch(next);
}

module.exports = {
    index: indexRoute,
    show: showRoute,
    create: createRoute,
    update: updateRoute,
    delete: deleteRoute
};
