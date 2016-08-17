/**
 * GET     /api/boards              ->  index
 * POST    /api/boards              ->  create
 * GET     /api/boards/:id          ->  show
 * PUT     /api/boards/:id          ->  update
 * DELETE  /api/boards/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Board = require('../../model/board.model');
var Chart = require('../../model/chart.model');
var CounterGroup = require('../../model/counterGroup.model');
var cache = require('../../components/cache');
var Seq = require('../../components/sequence');

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

// Gets a list of Boards
module.exports.index = function (req, res) {
    console.log(cache.get('boards'));
    Board.find({})
        .then(respondWithResult(res))
        .catch(handleError(res));
};

// Gets a single Board from the DB
module.exports.show = function (req, res) {
    Board.findOne({ urlName: req.params.id })
        .populate({ path: 'counters', populate: [{ path: '_counterGroup', model: CounterGroup, select: 'name short defaultUnit' }, { path: '_chart', model: Chart }] })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
};

// Creates a new Board in the DB
module.exports.create = function (req, res) {
    req.body.urlName = req.body.name.trim().replace(/\s+/g, '-');
    Seq.getNextSequence('board')
        .then(function (doc, err) {
            req.body._id = doc.seq;
            Board.create(req.body)
                .then(respondWithResult(res, 201))
                .catch(handleError(res));
        }).catch(handleError(res));
}

// Updates an existing Board in the DB
module.exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Board.findOne({ urlName: req.params.id })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Board from the DB
module.exports.destroy = function (req, res) {
    Board.findOne({ urlName: req.params.id })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}