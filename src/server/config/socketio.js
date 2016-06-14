/**
 * Socket.io configuration
 */

'use strict';
var EventEmitter = require('events');

var socketService = function (socketIo) {

    var Events = new EventEmitter();

    // When the client disconnects
    function onDisconnect(socket) {
        Events.emit('disconnect');
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

    function start() {
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
        
        return this;
    }

    function disconnect(callback) {
        var listner = createListener('disconnect', callback);
        Events.on('disconnect', listner);
    }

    function createListener(event, callBack) {
        return function () {
            console.log('SocketIO, emit event ' + event);
            callBack();
        };
    }
    
    return {
        start: start,
        disconnect: disconnect
    };
};

module.exports = socketService