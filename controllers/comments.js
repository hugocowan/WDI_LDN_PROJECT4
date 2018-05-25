const Comment = require('../models/comment');
const Part = require('../models/part');
// const util = require('util');
const Computer = require('../models/computer');


function createComputerComment(req, res, next){
  // console.log('currentuser: ', req.currentUser);
  req.body.createdBy = req.currentUser;
  Comment
    .create(req.body)
    .then(comment => {
      const newComment = comment;
      Computer
        .findById(req.params.id)
        .populate({
          path: 'comments addedBy',
          populate: { path: 'createdBy' }
        })
        .exec()
        .then(computer => {
          computer.comments.push(newComment);
          return computer.save();
        })
        .then(computer => {
          res.status(201).json(computer);
        });
    })
    .catch(next);
}

function deleteComputerComment(req, res, next){
  Computer
    .findById(req.params.id)
    .populate({
      path: 'comments',
      populate: { path: 'createdBy' }
    })
    .then(computer => {
      // console.log(util.inspect(computer, { depth: null }));
      computer.comments.remove(req.params.commentId);
      return computer.save();
    })
    .then(computer => res.status(204).json(computer))
    .catch(next);
}
function createPartComment(req, res, next){
  // console.log('currentuser: ', req.currentUser);
  req.body.createdBy = req.currentUser;
  Comment
    .create(req.body)
    .then(comment => {
      const newComment = comment;
      Part
        .findById(req.params.id)
        .populate({
          path: 'comments addedBy',
          populate: { path: 'createdBy' }
        })
        .exec()
        .then(part => {
          part.comments.push(newComment);
          return part.save();
        })
        .then(part => {
          res.status(201).json(part);
        });
    })
    .catch(next);
}

function deletePartComment(req, res, next){
  Part
    .findById(req.params.id)
    .populate({
      path: 'comments',
      populate: { path: 'createdBy' }
    })
    .then(part => {
      // console.log(util.inspect(part, { depth: null }));
      part.comments.remove(req.params.commentId);
      return part.save();
    })
    .then(part => res.status(204).json(part))
    .catch(next);
}
module.exports = {
  createPartComment,
  deletePartComment,
  createComputerComment,
  deleteComputerComment
};
