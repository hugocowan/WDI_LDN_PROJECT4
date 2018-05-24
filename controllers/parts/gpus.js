const Gpu = require('../../models/parts/gpu');

function indexRoute (req, res, next) {
  Gpu
    .find()
    .exec()
    .then((gpus) => res.json(gpus))
    .catch(next);
}

function showRoute (req, res, next) {
  Gpu
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((gpu) => res.json(gpu))
    .catch(next);
}

function createRoute (req, res, next) {
  Gpu
    .create(req.body)
    .then(gpu => res.status(201).json(gpu))
    .catch(next);
}

function updateRoute (req, res, next) {
  Gpu
    .findById(req.params.id)
    .then(gpu => {
      return Object.assign(gpu, req.body);
    })
    .then(gpu => gpu.save())
    .then(gpu => res.json(gpu))
    .catch(next);
}

function deleteRoute (req, res, next){
  Gpu
    .findById(req.params.id)
    .then(gpu => {
      return gpu.remove();
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
