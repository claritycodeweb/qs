'use strict';

var mongoose = require('mongoose');

var chartSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    total: Number,
    color: String,
    chartType: String,
    _counter: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Counter'
    }
});

var Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;