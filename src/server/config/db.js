exports = module.exports = function (config, mongoose) {
    return new Promise(function (resolve, reject) {
        mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
                if (err) {
                    console.error('Mongoose failed');
                    reject(err);
                } else {
                    console.log('Mongoose ok');
                    resolve('ok');
                }
            });

        mongoose.connection.on('error', function (err) {
            console.error('Mongo connection error: ' + err);
            process.exit(-1);
        });
    });
}
