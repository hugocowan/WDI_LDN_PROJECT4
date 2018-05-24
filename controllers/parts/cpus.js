const Cpu = require('../../models/parts/cpu');

function indexRoute (req, res, next) {
  Cpu
    .find()
    .exec()
    .then((cpus) => res.json(cpus))
    .catch(next);
}

function showRoute (req, res, next) {
  Cpu
    .findById(req.params.id)
    .populate('comments.createdBy')
    .then((cpu) => res.json(cpu))
    .catch(next);
}

function createRoute (req, res, next) {
  Cpu
    .create(req.body)
    .then(cpu => res.status(201).json(cpu))
    .catch(next);
}

function updateRoute (req, res, next) {
  Cpu
    .findById(req.params.id)
    .then(cpu => {
      return Object.assign(cpu, req.body);
    })
    .then(cpu => cpu.save())
    .then(cpu => res.json(cpu))
    .catch(next);
}

function deleteRoute (req, res, next){
  Cpu
    .findById(req.params.id)
    .then(cpu => {
      return cpu.remove();
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
