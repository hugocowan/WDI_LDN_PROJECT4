const Part = require('../models/part');

function indexRoute(req, res, next) {
    Part
        .find()
        .populate({
            path: 'comments createdBy',
            populate: {path: 'createdBy'}
        })
        .exec()
        .then((parts) => res.json(parts))
        .catch(next);
}

function showRoute(req, res, next) {
    Part
        .findById(req.params.id)
        .populate({
            path: 'comments createdBy',
            populate: {path: 'createdBy'}
        })
        .then((part) => {
            // console.log('part in show route: ', part);
            res.json(part);
        })
        .catch(next);
}

function createRoute(req, res, next) {
    req.body.createdBy = req.currentUser;
    Part
        .create(req.body)
        .then(part => res.status(201).json(part))
        .catch(next);
}

function updateRoute(req, res, next) {
    Part
        .findById(req.params.id)
        .then(part => {
            return Object.assign(part, req.body);
        })
        .then(part => part.save())
        .then(part => res.json(part))
        .catch(next);
}

function deleteRoute(req, res, next) {
    Part
        .findById(req.params.id)
        .then(part => {
            return part.remove();
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
