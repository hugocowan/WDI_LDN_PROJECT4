const Psu = require('../../models/parts/psu');

function indexRoute (req, res, next) {
  Psu
    .find()
    .exec()
    .then((psus) => res.json(psus))
    .catch(next);
}

function showRoute (req, res, next) {
  Psu
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((psu) => res.json(psu))
    .catch(next);
}

function createRoute (req, res, next) {
  Psu
    .create(req.body)
    .then(psu => res.status(201).json(psu))
    .catch(next);
}

function updateRoute (req, res, next) {
  Psu
    .findById(req.params.id)
    .then(psu => {
      return Object.assign(psu, req.body);
    })
    .then(psu => psu.save())
    .then(psu => res.json(psu))
    .catch(next);
}

function deleteRoute (req, res, next){
  Psu
    .findById(req.params.id)
    .then(psu => {
      return psu.remove();
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
