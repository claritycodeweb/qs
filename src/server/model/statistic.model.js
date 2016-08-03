'use strict';

var mongoose = require('mongoose');

var statisticSchema = new mongoose.Schema({
    url: String,
    value: String,
    statusCode: String,
    isError: Boolean,
    message: String,
    _counter: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Counter'
    },
    _board: {
        type: Number,
        ref: 'Board'
    }
});

var Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;