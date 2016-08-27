/**
 * GET     /api/countergroups              ->  index
 */

'use strict';

var _ = require('lodash');
var CounterGroup = require('../../model/counterGroup.model');
var cache = require('../../components/cache');
var counterGroup = null;

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entities) {
        if (entities) {                       
            cache.set('counterGroup', entities);                            
            res.status(statusCode).json(entities);
        }
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of CounterGroup
module.exports.index = function (req, res) {
    counterGroup = cache.get('counterGroup');
    if (counterGroup) {
        respondWithResult(res, 200)(counterGroup);
    } else {

        CounterGroup.find({enable: true})
            .then(respondWithResult(res))
            .catch(handleError(res));
    }
};
