// const Comment = require('../models/comment');
const Part = require('../models/part');
// const Computer = require('../models/computer');


function createPartComment(req, res, next){
  req.body.createdBy = req.currentUser;
  Part
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(part => {
      part.comments.push(req.body);
      return part.save();
    })
    .then(part => res.json(part))
    .catch(next);
}

function deletePartComment(req, res, next){
  Part
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(part => {
      const comment = part.comments.id(req.params.commentId);
      if(!comment.createdBy._id.equals(req.currentUser._id)){
        // return res.status(401).json({ message: 'Unauthorized' });
        throw new Error('Unauthorized');
      }
      comment.remove();
      return part.save();
    })
    .then(part => res.json(part))
    .catch(next);
}
module.exports = {
  createPartComment,
  deletePartComment
};
