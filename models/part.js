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
    enum: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX', 'SFX', 'SFX-L'],
    required: function() {
      return (this.partType === 'Case' ||
              this.partType === 'Motherboard' ||
              this.partType === 'PSU');
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
      return (this.partType === 'GPU' ||
              this.partType === 'CPU' ||
              this.partType === 'Motherboard');
    }
  },
  chipset: {
    type: String,
    enum: [
      'Z87', 'Z97', 'Z170', 'Z270', 'Z370', 'Z390', 'X99', 'X299', 'X79',
      'FM2+', 'AM3+', 'AM4', 'X399'
    ],
    required: function() {
      return (this.partType === 'CPU' ||
              this.partType === 'Motherboard');
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
      return this.partType === 'RAM';
    }
  },
  capacity: { type: Number },
  storageType: {
    type: String,
    enum: ['SSD', 'HDD'],
    required: function() {
      return this.partType === 'Storage';
    }
  }
});
module.exports = mongoose.model('Part', partSchema);
