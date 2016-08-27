/**
 * GET     /api/boards              ->  index
 * POST    /api/boards              ->  create
 */

'use strict';

var _ = require('lodash');
var Board = require('../../model/board.model');
var CounterGroup = require('../../model/counterGroup.model');
var Counters = require('../../model/counter.model');
var Logs = require('../../components/logs');
var log = new Logs();
var _ = require('lodash');

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
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

// Creates a new Logs in the DB
module.exports.create = function (req, res) {
    log.parse(req.body)
    res.send('Success');

}

/* GET users listing. */
module.exports.index = function (req, res) {
    res.send('Success respond from logs[GET]');
}