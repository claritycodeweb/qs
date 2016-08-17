/**
 * Express configuration
 */

'use strict';

var express = require('express');
var config = require('./environment');
var path = require('path');
var bodyParser = require('body-parser')

module.exports = function (app) {
    var env = app.get('env');
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.text({ type: 'application/logplex-1' }));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(express.static(app.get('appPath')));
};
