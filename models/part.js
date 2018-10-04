const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            'Case', 'CPU', 'GPU', 'Motherboard', 'PSU', 'RAM', 'Storage', 'Cooler'
        ],
        required: 'Part type is required.'
    },
    name: {type: String, required: 'A name is required.'},
    image: {type: String, required: 'An image is required.'},
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    size: {
        type: String,
        //0: m-itx | 1: m-atx | 2: atx | 3: e-atx
        enum: [0, 1, 2, 3],
        required: [
            function () {
                return (this.type === 'Case' ||
                    this.type === 'Motherboard' ||
                    this.type === 'PSU');
            }, 'Size is required.'
        ]
    },
    link: {type: String, required: 'A link to a reseller is required.'},
    price: {type: Number, required: 'Part price is required.'},
    scrapedPrice: {type: Number},
    lastScrape: {type: Date},
    description: {type: String},
    location: {
        lat: {type: Number},
        lng: {type: Number}
    },
    rating: {
        type: Number,
        min: 1, max: 5
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    vendor: {
        type: String,
        enum: ['Intel', 'AMD', 'Nvidia'],
        required: [
            function () {
                return (this.type === 'CPU' ||
                    this.type === 'GPU' ||
                    this.type === 'Motherboard');
            }, 'Vendor is required.'
        ]
    },
    chipset: {
        type: String,
        //DDR3:
        // 0: 'X79', 1: 'Z87', 2: 'Z97',
        // 3: 'FM2+', 4: 'AM3+',

        //DDR4:
        //5: 'X99', 6: 'Z170', 7: 'X299', 8: 'Z270', 9: 'Z370', 10: 'Z390',
        //11: 'AM4', 12: 'X399'
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        required: [
            function () {
                return (this.type === 'CPU' ||
                    this.type === 'Motherboard');
            }, 'Chipset is required.'
        ]
    },
    compatibleSockets: {
        type: String,
        // 0: 'Z87', 'Z97', 'Z170', 'Z270', 'Z370', 'Z390'
        // 1: 'X79', 'X99', 'X299'
        // 2: 'FM2+', 'AM3+'
        // 3: 'AM4'
        // 4: 'X399'
        enum: [0, 1, 2, 3, 4],
        required: [
            function () {
                return (this.type === 'CPU Cooler');
            }, 'Compatible socket(s) are required.'
        ]
    },
    vram: {
        type: Number,
        required: [
            function () {
                return this.type === 'GPU';
            }, 'VRAM is required.'
        ]
    },
    speed: {
        type: Number,
        required: [
            function () {
                return (this.type === 'CPU' ||
                    this.type === 'GPU');
            }, 'Clockspeed is required.'
        ]
    },
    power: {
        type: Number,
        required: [
            function () {
                return (this.type === 'PSU');
            }, 'PSU power is required.'
        ]
    },
    length: {type: Number},
    ramType: {
        type: String,
        enum: ['DDR2', 'DDR3', 'DDR4'],
        required: [
            function () {
                return this.type === 'RAM';
            }, 'RAM type is required.'
        ]
    },
    capacity: {
        type: Number,
        required: [
            function () {
                return (this.type === 'RAM' ||
                    this.type === 'Storage');
            }, 'Capacity is required.'
        ]
    },
    storageType: {
        type: String,
        enum: ['SSD', 'HDD'],
        required: [
            function () {
                return this.type === 'Storage';
            }, 'Storage type is required.'
        ]
    },
    coolerHeight: {
        type: Number,
        required: [
            function () {
                return (this.type === 'Case' ||
                    this.type === 'CPU Cooler');
            }, 'CPU cooler height/limit is required.'
        ]
    },
    coolerFanSize: {
        type: String,
        enum: ['80mm', '92mm', '120mm', '140mm', '200mm'],
        required: [
            function () {
                return (this.type === 'CPU Cooler');
            }, 'CPU fan size is required.'
        ]
    }
});

partSchema
    .virtual('avgRating')//stores a temporary value in RAM that calls the function.
    .get(function () {

        const totalStars = this.comments.reduce((total, comment) => total + parseInt(comment.rating), 0);

        if (!totalStars) return 0;
        return Math.round((totalStars / this.comments.length) * 2) / 2;
    });

partSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Part', partSchema);
