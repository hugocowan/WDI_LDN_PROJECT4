const Storage = require('../../models/parts/storage');

function indexRoute (req, res, next) {
  Storage
    .find()
    .exec()
    .then((storages) => res.json(storages))
    .catch(next);
}

function showRoute (req, res, next) {
  Storage
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((storage) => res.json(storage))
    .catch(next);
}

function createRoute (req, res, next) {
  Storage
    .create(req.body)
    .then(storage => res.status(201).json(storage))
    .catch(next);
}

function updateRoute (req, res, next) {
  Storage
    .findById(req.params.id)
    .then(storage => {
      return Object.assign(storage, req.body);
    })
    .then(storage => storage.save())
    .then(storage => res.json(storage))
    .catch(next);
}

function deleteRoute (req, res, next){
  Storage
    .findById(req.params.id)
    .then(storage => {
      return storage.remove();
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
