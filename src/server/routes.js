/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function (app) {
    // Insert routes below
    //app.use('/api/things', require('./api/thing'));
    //app.use('/api/users', require('./api/user'));
    
    //undefined asset or api routes should return a 404
    app.route('/:url(api|components|app|bower_components|assets)/*')
    .get(errors[404]);

    // base route index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};
