const mongoose = require('mongoose');

const moboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  size: {
    type: String,
    enum: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
    required: true
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
  vendor: { type: String, enum: ['AMD', 'Intel'], required: true },
  chipset: {
    type: String,
    enum: [
      'Z87', 'Z97', 'Z170', 'Z270', 'Z370', 'Z390', 'X99', 'X299',
      'FM2+', 'AM3+', 'AM4', 'X399'
    ],
    required: true
  }
});
module.exports = mongoose.model('Motherboard', moboSchema);
