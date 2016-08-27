/**
 * GET     /api/countergroups/:id              ->  show
 */

'use strict';

var Counter = require('../../model/counter.model');

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entities) {
        if (entities) {                                               
            res.status(statusCode).json(entities);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

module.exports.show = function (req, res) {
    Counter.findOne({ _id: req.params.id })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
};
