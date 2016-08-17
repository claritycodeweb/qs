'use strict';

var mongoose = require('mongoose');

var seq = new mongoose.Schema({
    _id: String,
    seq: Number
});

var Seq = mongoose.model('Seq', seq);

module.exports = Seq;