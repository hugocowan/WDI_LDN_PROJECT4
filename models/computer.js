const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required.' },
  image: { type: String },
  description: { type: String },
  type: { type: String, enum: ['Computer'], required: true },
  rating: {
    type: Number,
    min: 1, max: 5
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  case: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  cpu: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  gpu: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  motherboard: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  psu: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  ram: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  storage: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  cooler: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part',
    required: true
  },
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }]
});


computerSchema.virtual('avgRating')
  .get(function() {

    const totalStars = this.comments.reduce((total, comment) => total + parseInt(comment.rating), 0);
    if(!totalStars) return 0;
    return Math.round((totalStars/this.comments.length)*2)/2;
  });

computerSchema.virtual('price')
  .get(function() {

    return this.case.price +
    this.cpu.price +
    this.gpu.price +
    this.motherboard.price +
    this.psu.price +
    this.ram.price +
    this.storage.price;
  });

computerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Computer', computerSchema);
