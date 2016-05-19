'use strict';

var mongoose = require('mongoose');

var statisticSchema = new mongoose.Schema({
    url: String,
    took: String
});

var StatisticData = mongoose.model('StatisticsData', statisticSchema);

module.exports = StatisticData;