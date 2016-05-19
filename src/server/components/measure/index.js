'use strict';

var http = require('http');
var model = require('../../model/statistic.data');

var timeOut;

function responseTimeInterval(url, socket) {
    var start = new Date();
    http.get({ host: url, port: 80 }, function (res) {
        var took = new Date() - start;
        model.create({ url: url, took: took });
        //socket.emit('responsetime', {url: url, took: took});
    });
}

function responseTime(url, interval) {
    interval = interval || 5000;
    
    function callback() {
        var start = new Date();
        http.get({ host: url, port: 80 }, function (res) {
            var took = new Date() - start;
            model.create({ url: url, took: took });
            
            if (took > 5000) {
                interval *= 2;
            }

        });
        timeOut = setTimeout(callback, interval);
    }
    timeOut = setTimeout(callback, interval);
}

function stop(){
    clearTimeout(timeOut);
}

module.exports = function (socket) {
    
    socket.on('disconnect', function(){
        stop();
    });
    
    return {
        //responseTimeInterval: responseTimeInterval,
        responseTime: responseTime,
        stop: stop
    }
};