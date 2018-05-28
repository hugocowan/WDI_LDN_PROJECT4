const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'Case', 'CPU', 'GPU', 'Motherboard', 'PSU', 'RAM', 'Storage'
    ],
    required: true
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }],
  size: {
    type: String,
    //0: mini-itx | 1: micro-atx | 2: atx | 3: e-atx
    enum: [ 0, 1, 2, 3],
    required: function() {
      return (this.type === 'Case' ||
              this.type === 'Motherboard' ||
              this.type === 'PSU');
    }
  },
  link: { type: String },
  price: { type: Number },
  description: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
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
    required: function() {
      return (this.type === 'GPU' ||
              this.type === 'CPU' ||
              this.type === 'Motherboard');
    }
  },
  chipset: {
    type: String,
    //DDR3:
    // 0: 'X79', 1: 'Z87', 2: 'Z97',
    // 3: 'FM2+', 4: 'AM3+',

    //DDR4:
    //5: 'X99', 6: 'Z170', 7: 'X299', 8: 'Z270', 9: 'Z370', 10: 'Z390',
    //11: 'AM4', 12: 'X399'
    enum: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
    required: function() {
      return (this.type === 'CPU' ||
              this.type === 'Motherboard');
    }
  },
  baseFreq: { type: Number },
  boostFreq: { type: Number },
  vram: { type: Number },
  speed: { type: Number },
  power: { type: Number },
  length: { type: Number },
  ramType: {
    type: String,
    enum: ['DDR2', 'DDR3', 'DDR4'],
    required: function() {
      return this.type === 'RAM';
    }
  },
  capacity: { type: Number },
  storageType: {
    type: String,
    enum: ['SSD', 'HDD'],
    required: function() {
      return this.type === 'Storage';
    }
  }
});
module.exports = mongoose.model('Part', partSchema);
