'use strict';

var mongoose = require('mongoose');

var statisticSchema = new mongoose.Schema({
    name: String,
    type: String,
    url: String,
    unit: String,
    enable: Boolean
});

var Statistic = mongoose.model('Statistics', statisticSchema);

module.exports = Statistic;