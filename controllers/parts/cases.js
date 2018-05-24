const Case = require('../../models/parts/case');

function indexRoute (req, res, next) {
  Case
    .find()
    .exec()
    .then((cases) => res.json(cases))
    .catch(next);
}

function showRoute (req, res, next) {
  Case
    .findById(req.params.id)
    .populate('comments.createdBy')
    //The word case throws a fatal error.
    .then((chassis) => res.json(chassis))
    .catch(next);
}

function createRoute (req, res, next) {
  Case
    .create(req.body)
    .then(chassis => res.status(201).json(chassis))
    .catch(next);
}

function updateRoute (req, res, next) {
  Case
    .findById(req.params.id)
    .then(chassis => {
      return Object.assign(chassis, req.body);
    })
    .then(chassis => chassis.save())
    .then(chassis => res.json(chassis))
    .catch(next);
}

function deleteRoute (req, res, next){
  Case
    .findById(req.params.id)
    .then(chassis => {
      return chassis.remove();
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
