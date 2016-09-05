/**
 * GET     /api/countergroups/:id              ->  show
 */

'use strict';

var Board = require('../../model/board.model');
var Counter = require('../../model/counter.model');
var Chart = require('../../model/chart.model');
var CounterGroup = require('../../model/counterGroup.model');

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
        res.status(statusCode).send({ message: err.message, stack: err.stack });
    };
}

module.exports.show = function (req, res) {
    Counter.findOne({ _id: req.params.id })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
};

module.exports.create = function (req, res) {
    var board1;
    Board.findOne({ _id: req.body.board._id })
        .then(handleEntityNotFound(res))
        .then((board) => {
            board1 = board;
            if (board) {
                return Chart.create(
                    {
                        name: req.body.chart.name,
                        description: '',
                        chartType: req.body.chart.type,
                        total: req.body.chart.total,
                        color: req.body.chart.color
                    })
            }
        })
        .then((chart) => {
            console.log(board1);
            if (chart) {
                return Counter.create(
                    {
                        name: req.body.name,
                        url: req.body.url,
                        _board: req.body.board._id,
                        _counterGroup: req.body.counterGroup._id,
                        _chart: chart._id
                    });
            }
        })
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
};