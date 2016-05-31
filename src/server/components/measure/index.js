'use strict';

var model = require('../../model/statistic.data');

var measureService = function (http, stat) {
    var timeOut;
    
    function responseTime(url, interval) {
        interval = interval || 5000;
        var defaultInterval = interval;

        function callback() {
            stat.responseTime(url).then(function (data) {
                model.create({
                    url: url,
                    took: data.took,
                    statusCode: data.res.statusCode,
                    isError: false,
                    message: data.res.statusMessage
                });

                if (data.took > 5000) {
                    interval += 2000;
                } else {
                    interval = defaultInterval;
                }
                
            }, function (err) {
                
                model.create({
                    url: url,
                    took: 0,
                    statusCode: err.statusCode,
                    isError: true,
                    message: err.message
                });

                interval += 2000;
            });
            timeOut = setTimeout(callback, interval);
        }
        timeOut = setTimeout(callback, interval);
    }

    function stop() {
        clearTimeout(timeOut);
    }

    return {
        responseTime: responseTime,
        stop: stop
    };
};

module.exports = measureService