const mongoose = require('mongoose');
const moment = require('moment');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

commentSchema.virtual('createdAtRelative')
  .get(function(){
    return moment(this.createdAt).fromNow();
  });

commentSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json){
    delete json.createdAt;
    delete json.updatedAt;
    return json;
  }
});

const computerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
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
    ref: 'Part'
  },
  cpu: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part'
  },
  gpu: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part'
  },
  mobo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part'
  },
  psu: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part'
  },
  ram: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part'
  },
  storage: {
    type: mongoose.Schema.ObjectId,
    ref: 'Part'
  },
  comments: [commentSchema]
});

computerSchema.virtual('avgRating')
  .get(function() {
    return Math.round(this.comments.reduce((sum, comment) => {
      return sum + comment.rating;
    }, 0) / this.comments.length);
  });

computerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Computer', computerSchema);
