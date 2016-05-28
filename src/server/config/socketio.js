/**
 * Socket.io configuration
 */

'use strict';

var socketService = function (socketIo) {
    // When the client disconnects
    function onDisconnect(socket) {

    }

    // When the client connects
    function onConnect(socket) {
        // When the client emits 'info'
        socket.on('info', data => {
            socket.log(JSON.stringify(data, null, 2));
        });

        // Register sockets
        require('../components/measure/measure.socket').register(socket);
    }

    socketIo.on('connection', function (socket) {
        socket.address = socket.request.connection.remoteAddress +
            ':' + socket.request.connection.remotePort;

        socket.connectedAt = new Date();

        socket.log = function (data) {
            console.log('SocketIO ' + socket.nsp.name + ' ' + socket.address + ' ' + data);
        };

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket);
            socket.log('DISCONNECTED');
        });

        // Call onConnect.
        onConnect(socket);
        socket.log('CONNECTED');
    });

    return {
        //test: test,
    };
};

module.exports = socketService