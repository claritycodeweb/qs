exports = module.exports = function(config, mongoose, mockgoose) {
    return new Promise(function(resolve, reject) {
        mockgoose(mongoose).then(function() {
            mongoose.connect(config.mongo.uri, function(err) {
                if (err) {
                  console.error('Mockgoose wrapper failed');
                  reject(err);
                } else {
                  console.log('Mockgoose wrapper ok');
                  resolve('ok');
                }
            });
        });
    });
}
