'use strict';

var mongoose = require('mongoose');

var counter = new mongoose.Schema({
    name: String,
    _board: {
        type: Number,
        ref: 'Board'
    },
    _counterGroup: {
        type: Number, 
        ref: "CounterGroup"
    },
    _chart: {
        type: Object,
        ref: "Chart"
    },
    url: String,
    description: String,
    interval: Number,
    enable: Boolean
});

var Counter = mongoose.model('Counter', counter);

module.exports = Counter;