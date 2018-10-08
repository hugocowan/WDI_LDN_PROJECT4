const mongoose = require('mongoose');

const scraperSchema = new mongoose.Schema( {
    part: { type: mongoose.Schema.ObjectId, ref: 'Part' },
    data: [{
        price: { type: Number, required: true },
        createdAt: { type: Date, required: true }
    }],
    lastScrape: { type: Date },
    url: { type: String, required: true }
});


scraperSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Scraper', scraperSchema);