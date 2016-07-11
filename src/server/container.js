/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var socketIo = require('socket.io');
var socketIoService =  require('./config/socketio');

var statistics = require('./components/statistic')(http);
var measure = require('./components/measure')(http, statistics);

//config
var config = require('./config/environment');

//db
var db = null;
if (process.env.NODE_ENV ===  'test' && config.inMemoryDb) {
    // test
    db = require('./test/mocks/db')(config, mongoose);
} else {
    // browser context
    db = require('./config/db')(config, mongoose);
}

module.exports = {
    express: express,
    mongoose: mongoose,
    http: http,
    config: config,
    socketIo: socketIo,
    statistics: statistics,
    measure: measure,
    socketIoService: socketIoService,
    db: db
}
