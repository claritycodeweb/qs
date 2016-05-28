/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var socketIo = require('socket.io');

//config
var config = require('./config/environment');

module.exports = {
    express: express,
    mongoose: mongoose,
    http: http,
    config: config,
    socketIo: socketIo
}
