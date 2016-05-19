/**
 * Express configuration
 */

'use strict';

var express = require('express');
var config = require('./environment');
var path = require('path');

module.exports = function (app) {
    var env = app.get('env');
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('appPath', path.join(config.root, 'client'));

    if ('dev' === env || 'test' === env) {
        app.use(express.static(app.get('appPath')));
    }
};