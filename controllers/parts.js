const Part = require('../models/part');

function indexRoute (req, res, next) {
  Part
    .find()
    .exec()
    .then((computers) => res.json(computers))
    .catch(next);
}

function showRoute (req, res, next) {
  Part
    .findById(req.params.id)
    .then((computer) => res.json(computer))
    .catch(next);
}

function createRoute (req, res, next) {
  Part
    .create(req.body)
    .then(computer => res.status(201).json(computer))
    .catch(next);
}

function updateRoute (req, res, next) {
  Part
    .findById(req.params.id)
    .then(computer => {
      return Object.assign(computer, req.body);
    })
    .then(computer => computer.save())
    .then(computer => res.json(computer))
    .catch(next);
}

function deleteRoute (req, res, next){
  Part
    .findById(req.params.id)
    .then(computer => {
      return computer.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
