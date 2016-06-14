'use strict';

var mongoose = require('mongoose');

var statisticSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    unit: String,
    enable: Boolean
});

var CounterGroup = mongoose.model('CounterGroup', statisticSchema);

module.exports = CounterGroup;