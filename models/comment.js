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

module.exports = mongoose.model('Comment', commentSchema);
