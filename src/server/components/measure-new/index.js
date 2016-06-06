function requester(http) {
    return {
        get: function(url) {
          return new Promise(function(resolve, reject) {
            var start = new Date();
            http.get({
                host: url,
                port: 80
            }, function(res) {
                var took = new Date() - start;
                resolve({
                  took: took,
                  status: res.statusCode
                })
            }).on('error', function(error) {
                console.error('GET request error');
                reject({
                  error: error
                })
            });
          })
        }
    }
}

module.exports = requester
