/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var mockgoose = require("mockgoose");
var http = require('http');
var socketIo = require('socket.io');
var socketIoService =  require('./config/socketio');

var statistics = require('./components/statistic')(http);
var measure = require('./components/measure')(http, statistics);
var cache = require('./components/cache');

//config
var config = require('./config/environment');

//db
var db = null;
if (process.env.NODE_ENV ===  'test' && config.inMemoryDb) {
    // test
    db = require('./test/mocks/db')(config, mongoose, mockgoose);
} else {
    // browser context
    db = require('./config/db')(config, mongoose);
}

module.exports = {
    express: express,
    mongoose: mongoose,
    mockgoose: mockgoose,
    http: http,
    config: config,
    socketIo: socketIo,
    statistics: statistics,
    measure: measure,
    socketIoService: socketIoService,
    db: db
}
