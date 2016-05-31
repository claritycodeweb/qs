/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var socketIo = require('socket.io');
var promise = require('promise');

var statistics = require('./components/statistic')(http);
var measure = require('./components/measure')(http, statistics);

//config
var config = require('./config/environment');

module.exports = {
    express: express,
    mongoose: mongoose,
    http: http,
    config: config,
    socketIo: socketIo,
    promise: promise,
    statistics: statistics,
    measure: measure
}
