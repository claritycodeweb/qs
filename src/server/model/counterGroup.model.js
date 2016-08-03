'use strict';

var mongoose = require('mongoose');

var statisticSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    short: String,
    unit: String,
    platform: String,
    description: String,
    enable: Boolean,
    defaultUnit: String
});

var CounterGroup = mongoose.model('CounterGroup', statisticSchema);

module.exports = CounterGroup;