'use strict';

var model = require('../../model/statistic.model');

var measureService = function (http, stat) {
    var timeOut;

    // This will grow infinitely causing out of memory error.
    var responses = [];

    function responseTime(url, interval, board, counter) {
        interval = interval || 5000;
        var defaultInterval = interval;

        function callback() {
            stat.responseTime(url).then(function (data) {
                var res = {
                    url: url,
                    took: data.took,
                    statusCode: data.res.statusCode,
                    isError: false,
                    message: data.res.statusMessage,
                    _board: board._id,
                    _counter: counter._id
                }
                responses.push(res);
                model.create(res);

                if (data.took > 5000) {
                    interval += 2000;
                } else {
                    interval = defaultInterval;
                }

            }, function (err) {
                var resErr = {
                    url: url,
                    took: 0,
                    statusCode: err.statusCode,
                    isError: true,
                    message: err.message
                };
                responses.push(resErr); // HERE
                model.create(resErr);

                interval += 2000;
            });
            timeOut = setTimeout(callback, interval);
        }
        timeOut = setTimeout(callback, interval);
    }

    function stop(callback) {
        clearTimeout(timeOut);

        if(callback){
            callback();
        }
    }

    return {
        responseTime: responseTime,
        stop: stop,
        responses: function () {
            return responses;
        }
    };
};

module.exports = measureService
