'use strict';

var mongoose = require('mongoose');

var board = new mongoose.Schema({
    _id: Number,
    name: String,
    urlName: String,
    enable: Boolean,
    counters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Counter' }]
});

var Board = mongoose.model('Board', board);

module.exports = Board;