var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var config = require('./config/environment'); // load the config
var stat = require('./components/measure');

// connect to db
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
    console.error('Mongo connection error: ' + err);
    process.exit(-1);
});

// prepare initial data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express(); // create our app w/ express
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

var socketio = require('socket.io')(server);
require('./config/socketio')(socketio);

function runApp() {
    server.listen(config.port, config.ip, function () {
        console.log('Server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

runApp();