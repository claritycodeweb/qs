'use strict';

var model = require('../../model/statistic.data');

var measureService = function (http) {
    var timeOut;

    function responseTimeInterval(url, socket) {
        var start = new Date();
        http.get({ host: url, port: 80 }, function (res) {
            var took = new Date() - start;
            model.create({ url: url, took: took });
            //socket.emit('responsetime', {url: url, took: took});
        }).on("error", function (e) {
            console.log("GET request error")
            interval *= 2;
        });
    }

    function responseTime(url, interval) {
        interval = interval || 5000;
        var defaultInterval = interval;
        function callback() {
            var start = new Date();
            http.get(url, function (res) {
                var took = new Date() - start;
                model.create({
                    url: url,
                    took: took,
                    statusCode: res.statusCode,
                    isError: false,
                    message: res.statusMessage
                });

                if (took > 5000) {
                    interval += 2000;
                } else {
                    interval = defaultInterval;
                }

                //console.log('Interval ' + interval/1000 + "s" + " took: "+ took);

            }).on("error", function (e) {
                model.create({
                    url: url,
                    took: 0,
                    statusCode: e.statusCode,
                    isError: true,
                    message: e.message
                });

                interval += 2000;

                //console.log('Interval ' + interval/1000 + "s");
                
            }).end();
            timeOut = setTimeout(callback, interval);
        }
        timeOut = setTimeout(callback, interval);
    }

    function stop() {
        clearTimeout(timeOut);
    }

    return {
        //responseTimeInterval: responseTimeInterval,
        responseTime: responseTime,
        stop: stop
    };
};

module.exports = measureService