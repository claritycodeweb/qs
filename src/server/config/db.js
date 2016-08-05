exports = module.exports = function (config, mongoose) {
    mongoose.connect(config.mongo.uri, config.mongo.options);
    mongoose.connection.on('error', function (err) {
        console.error('Mongo connection error: ' + err);
        process.exit(-1);
    });
}
