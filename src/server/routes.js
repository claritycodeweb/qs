/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function (app) {
    // Insert routes below
    app.use('/api/boards', require('./api/board'));
    app.use('/api/logs', require('./api/logs'));
    app.use('/api/countergroups', require('./api/counterGroup'));
    app.use('/api/counters', require('./api/counter'));
    
    //undefined asset or api routes should return a 404
    app.route('/:url(api|components|app|bower_components|assets)/*')
    .get(errors[404]);

    // base route index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};
