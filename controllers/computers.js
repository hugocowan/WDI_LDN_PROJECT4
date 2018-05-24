const Computer = require('../models/computer');

function indexRoute (req, res, next) {
  Computer
    .find()
    .exec()
    .then((computers) => res.json(computers))
    .catch(next);
}

function showRoute (req, res, next) {
  Computer
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((computer) => res.json(computer))
    .catch(next);
}

function createRoute (req, res, next) {
  Computer
    .create(req.body)
    .then(computer => res.status(201).json(computer))
    .catch(next);
}

function updateRoute (req, res, next) {
  Computer
    .findById(req.params.id)
    .then(computer => {
      return Object.assign(computer, req.body);
    })
    .then(computer => computer.save())
    .then(computer => res.json(computer))
    .catch(next);
}

function deleteRoute (req, res, next){
  Computer
    .findById(req.params.id)
    .then(computer => {
      return computer.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

function commentCreateRoute(req, res, next){
  req.body.createdBy = req.currentUser;
  Computer
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(computer => {
      computer.comments.push(req.body);
      return computer.save();
    })
    .then(computer => res.json(computer))
    .catch(next);
}
function commentDeleteRoute(req, res, next){
  Computer
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(computer => {
      const comment = computer.comments.id(req.params.commentId);
      if(!comment.createdBy._id.equals(req.currentUser._id)){
        // return res.status(401).json({ message: 'Unauthorized' });
        throw new Error('Unauthorized');
      }
      comment.remove();
      return computer.save();
    })
    .then(computer => res.json(computer))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
};
