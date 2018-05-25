const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'case', 'cpu', 'gpu', 'mobo', 'psu', 'ram', 'storage'
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
    enum: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
    required: function() {
      return (this.partType === 'case' ||
              this.partType === 'mobo');
    }
  },
  psuSize: {
    type: String,
    enum: ['ATX', 'SFX', 'SFX-L'],
    required: function() {
      return this.partType === 'psu';
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
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  cpuVendor: {
    type: String,
    enum: ['Intel', 'AMD'],
    required: function() {
      return (this.partType === 'cpu' ||
              this.partType === 'mobo');
    }
  },
  gpuVendor: {
    type: String,
    enum: ['Intel', 'AMD', 'Nvidia'],
    required: function() {
      return this.partType === 'gpu';
    }
  },
  chipset: {
    type: String,
    enum: [
      'Z87', 'Z97', 'Z170', 'Z270', 'Z370', 'Z390', 'X99', 'X299',
      'FM2+', 'AM3+', 'AM4', 'X399'
    ],
    required: function() {
      return (this.partType === 'cpu' ||
              this.partType === 'mobo');
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
      return this.partType === 'ram';
    }
  },
  capacity: { type: Number },
  storageType: {
    type: String,
    enum: ['SSD', 'HDD'],
    required: function() {
      return this.partType === 'storage';
    }
  }
});
module.exports = mongoose.model('Part', partSchema);
