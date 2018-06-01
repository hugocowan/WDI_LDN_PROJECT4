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
          path: 'case cpu gpu motherboard psu ram storage comments createdBy',
          populate: { path: 'createdBy' }
        })
        .exec()
        .then(computer => {
          computer.comments.push(newComment);
          return computer.save();
        })
        .then(() => {
          Computer
            .findById(req.params.id)
            .populate({
              path: 'case cpu gpu motherboard psu ram storage comments createdBy',
              populate: { path: 'createdBy' }
            })
            .exec()
            .then(computer => {
              res.json(computer);
            });
        });
    })
    .catch(next);
}

function deleteComputerComment(req, res, next){
  Computer
    .findById(req.params.id)
    .populate({
      path: 'case cpu gpu motherboard psu ram storage comments createdBy',
      populate: { path: 'createdBy' }
    })
    .then(computer => {
      // console.log(util.inspect(computer, { depth: null }));
      computer.comments.remove(req.params.commentId);
      return computer.save();
    })
    .then(computer => res.json(computer))
    .catch(next);
}
function createPartComment(req, res, next){
  req.body.createdBy = req.currentUser;
  Comment
    .create(req.body)
    .then(comment => {
      Part
        .findById(req.params.id)
        .populate({
          path: 'comments createdBy',
          populate: { path: 'createdBy' }
        })
        .exec()
        .then(part => {
          part.comments.push(comment);
          return part.save();
        })
        .then(() => {
          Part
            .findById(req.params.id)
            .populate({
              path: 'comments createdBy',
              populate: { path: 'createdBy' }
            })
            .exec()
            .then(part => {
              // console.log(part);
              res.status(201).json(part);
            });
        });
    })
    .catch(next);
}

function deletePartComment(req, res, next){
  Part
    .findById(req.params.id)
    .populate({
      path: 'comments createdBy',
      populate: { path: 'createdBy' }
    })
    .then(part => {
      // console.log(util.inspect(part, { depth: null }));
      part.comments.remove(req.params.commentId);
      part.save();
      res.json(part);
    })
    .catch(next);
}
module.exports = {
  createPartComment,
  deletePartComment,
  createComputerComment,
  deleteComputerComment
};
