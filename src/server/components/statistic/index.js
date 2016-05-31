'use strict';

var statisticService = function (http) {
    
    function responseTime(url) {
        return new Promise(function (resolve, reject) {
            var start = new Date();         
            http.get(url, function (res) {
                var took = new Date() - start;
                return resolve({ res: res, took: took });
            }).on("error", function (e) {
                return reject(e);
            });         
        });
    }
    
    return {
        responseTime: responseTime
    };
};

module.exports = statisticService