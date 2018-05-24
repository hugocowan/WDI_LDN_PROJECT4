const mongoose = require('mongoose');

const ramSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['DDR2', 'DDR3', 'DDR4'],
    required: true
  },
  capacity: { type: Number, required: true },
  speed: { type: Number }
});
module.exports = mongoose.model('RAM', ramSchema);
