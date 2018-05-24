const mongoose = require('mongoose');

const gpuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
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
  vendor: { type: String, enum: ['AMD', 'Intel', 'Nvidia'] },
  vram: { type: Number },
  speed: { type: Number }
});
module.exports = mongoose.model('GPU', gpuSchema);
