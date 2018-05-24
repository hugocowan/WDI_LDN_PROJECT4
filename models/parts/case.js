const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
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
  }
});
module.exports = mongoose.model('Case', caseSchema);
