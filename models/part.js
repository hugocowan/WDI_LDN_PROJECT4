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
    //0: mini-itx | 1: micro-atx | 2: atx | 3: e-atx
    enum: [ 0, 1, 2, 3],
    required: function() {
      return (this.type === 'Case' ||
              this.type === 'Motherboard' ||
              this.type === 'PSU');
    }
  },
  link: { type: String },
  price: { type: Number, required: true },
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
      return (this.type === 'CPU' ||
              this.type === 'GPU' ||
              this.type === 'Motherboard');
    }
  },
  chipset: {
    type: String,
    //DDR3:
    // 0: 'X79', 1: 'Z87', 2: 'Z97',
    // 3: 'FM2+', 4: 'AM3+',

    //DDR4:
    //5: 'X99', 6: 'Z170', 7: 'X299', 8: 'Z270', 9: 'Z370', 10: 'Z390',
    //11: 'AM4', 12: 'X399'
    enum: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
    required: function() {
      return (this.type === 'CPU' ||
              this.type === 'Motherboard');
    }
  },
  vram: { type: Number },
  speed: { type: Number },
  power: { type: Number },
  length: { type: Number },
  ramType: {
    type: String,
    enum: ['DDR2', 'DDR3', 'DDR4'],
    required: function() {
      return this.type === 'RAM';
    }
  },
  capacity: { type: Number },
  storageType: {
    type: String,
    enum: ['SSD', 'HDD'],
    required: function() {
      return this.type === 'Storage';
    }
  }
});

partSchema
  .virtual('avgRating')//stores a temporary value in RAM that calls the function.
  .get(function getAvgRating() {
    if(this.comments.length === 0) return false;
    const total = this.comments.reduce((sum, comment) => {
      return sum + comment.rating;
    }, 0);
    const avg = total / this.comment.length;
    return Math.round(avg*2)/2;
  });

partSchema.methods.getStarIcons = function() {
  console.log('here');
  let stars = '';
  for(let i = 0; i<Math.floor(this.avgRating); i++) {
    stars += '<i class="fa fa-star"></i> ';
  }
  if(this.avgRating % 1 > 0) stars += '<i class="fa fa-star-half"></i>';
  return stars;
};

module.exports = mongoose.model('Part', partSchema);
