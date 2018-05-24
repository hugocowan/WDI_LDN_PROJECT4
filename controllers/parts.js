const Part = require('../models/part');

function indexRoute (req, res, next) {
  Part
    .find()
    .exec()
    .then((parts) => res.json(parts))
    .catch(next);
}

function showRoute (req, res, next) {
  Part
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((part) => res.json(part))
    .catch(next);
}

function createRoute (req, res, next) {
  Part
    .create(req.body)
    .then(part => res.status(201).json(part))
    .catch(next);
}

function updateRoute (req, res, next) {
  Part
    .findById(req.params.id)
    .then(part => {
      return Object.assign(part, req.body);
    })
    .then(part => part.save())
    .then(part => res.json(part))
    .catch(next);
}

function deleteRoute (req, res, next){
  Part
    .findById(req.params.id)
    .then(part => {
      return part.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

// function commentCreateRoute(req, res, next){
//   req.body.createdBy = req.currentUser;
//   Part
//     .findById(req.params.id)
//     .populate('comments.createdBy')
//     .exec()
//     .then(part => {
//       part.comments.push(req.body);
//       return part.save();
//     })
//     .then(part => res.json(part))
//     .catch(next);
// }
// function commentDeleteRoute(req, res, next){
//   Part
//     .findById(req.params.id)
//     .populate('comments.createdBy')
//     .exec()
//     .then(part => {
//       const comment = part.comments.id(req.params.commentId);
//       if(!comment.createdBy._id.equals(req.currentUser._id)){
//         // return res.status(401).json({ message: 'Unauthorized' });
//         throw new Error('Unauthorized');
//       }
//       comment.remove();
//       return part.save();
//     })
//     .then(part => res.json(part))
//     .catch(next);
// }

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
  // commentCreate: commentCreateRoute,
  // commentDelete: commentDeleteRoute
};
