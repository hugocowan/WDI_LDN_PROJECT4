const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
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
  capacity: { type: Number },
  type: { type: String, enum: ['SSD', 'HDD'] }
});
module.exports = mongoose.model('Storage', storageSchema);
