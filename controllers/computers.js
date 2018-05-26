const Computer = require('../models/computer');

function indexRoute (req, res, next) {
  Computer
    .find()
    .populate({
      path: 'Case CPU GPU Motherboard PSU RAM Storage comments createdBy',
      populate: { path: 'createdBy' }
    })
    .exec()
    .then((computers) => res.json(computers))
    .catch(next);
}

function showRoute (req, res, next) {
  Computer
    .findById(req.params.id)
    .populate({
      path: 'Case CPU GPU Motherboard PSU RAM Storage comments createdBy',
      populate: { path: 'createdBy' }
    })
    .then((computer) => {
      // console.log(computer);
      res.json(computer);
    })
    .catch(next);
}

function createRoute (req, res, next) {
  req.body.createdBy = req.currentUser;
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

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
