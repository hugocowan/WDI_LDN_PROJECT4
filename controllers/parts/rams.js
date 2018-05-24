const Ram = require('../../models/parts/ram');

function indexRoute (req, res, next) {
  Ram
    .find()
    .exec()
    .then((rams) => res.json(rams))
    .catch(next);
}

function showRoute (req, res, next) {
  Ram
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((rams) => res.json(rams))
    .catch(next);
}

function createRoute (req, res, next) {
  Ram
    .create(req.body)
    .then(rams => res.status(201).json(rams))
    .catch(next);
}

function updateRoute (req, res, next) {
  Ram
    .findById(req.params.id)
    .then(rams => {
      return Object.assign(rams, req.body);
    })
    .then(rams => rams.save())
    .then(rams => res.json(rams))
    .catch(next);
}

function deleteRoute (req, res, next){
  Ram
    .findById(req.params.id)
    .then(rams => {
      return rams.remove();
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
