/**
 * Socket.io configuration
 */

'use strict';

var stat = require('../components/measure');
// When the client disconnects
function onDisconnect(socket) {

}

// When the client connects
function onConnect(socket) {
    // When the client emits 'info'
    socket.on('info', data => {
        socket.log(JSON.stringify(data, null, 2));
    });

    // Insert sockets
    require('../components/measure/measure.socket').register(socket);
    
    //start collect statistics
    stat(socket).responseTime('google.pl', 5000);
}

module.exports = function (socketio) {
    socketio.on('connection', function (socket) {
        socket.address = socket.request.connection.remoteAddress +
            ':' + socket.request.connection.remotePort;

        socket.connectedAt = new Date();

        socket.log = function (data) {
            console.log('SocketIO ' + socket.nsp.name + ' ' + socket.address + ' ' + data);
        };

        // var intervalId = setInterval(function () {
        //     stat.responseTimeTimeout('google.pl', socket);
        // }, 8000);

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket);
            socket.log('DISCONNECTED');
        });

        // Call onConnect.
        onConnect(socket);
        socket.log('CONNECTED');
    });
}