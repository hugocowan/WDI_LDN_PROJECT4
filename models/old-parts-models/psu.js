const mongoose = require('mongoose');

const psuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  size: {
    type: String,
    enum: ['ATX', 'SFX', 'SFX-L'],
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
  power: { type: Number },
  length: { type: Number }
});

module.exports = mongoose.model('PSU', psuSchema);
