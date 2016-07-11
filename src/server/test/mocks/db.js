exports = module.exports = function (config, mongoose) {
    var mockgoose = require("mockgoose");

    mockgoose(mongoose);

    mongoose.connect(config.mongo.uri);

    return mockgoose;
}