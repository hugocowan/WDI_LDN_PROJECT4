const Part = require('../models/part');

const scrapePricing = async (url) => {
    console.log(url);
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

async function scrapeRoute(req, res) {

    Part
        .findById(req.params.id)
        .then(async part => {
            let scrapeData = {};
            await scrapePricing(req.body.link)
                .then((price) => {
                    scrapeData.scrapedPrice = price;
                    scrapeData.lastScrape = new Date();
                })
                .catch(() => scrapeData.scrapedPrice = null);

            console.log('scraping successful!', scrapeData);
            Object.assign(part, scrapeData);
            part.save();
            res.json(part);
        });


}

module.exports = {
    scrape: scrapeRoute
}