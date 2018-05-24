const Mobo = require('../../models/parts/mobo');

function indexRoute (req, res, next) {
  Mobo
    .find()
    .exec()
    .then((mobos) => res.json(mobos))
    .catch(next);
}

function showRoute (req, res, next) {
  Mobo
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((mobo) => res.json(mobo))
    .catch(next);
}

function createRoute (req, res, next) {
  Mobo
    .create(req.body)
    .then(mobo => res.status(201).json(mobo))
    .catch(next);
}

function updateRoute (req, res, next) {
  Mobo
    .findById(req.params.id)
    .then(mobo => {
      return Object.assign(mobo, req.body);
    })
    .then(mobo => mobo.save())
    .then(mobo => res.json(mobo))
    .catch(next);
}

function deleteRoute (req, res, next){
  Mobo
    .findById(req.params.id)
    .then(mobo => {
      return mobo.remove();
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
