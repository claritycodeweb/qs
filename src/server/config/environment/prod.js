// Production specific configuration
// ==================================
// TODO

module.exports = {

    // MongoDB connection
    mongo: {
        uri: process.env.MONGODB_URI
    },

    // Seed database on startup
    seedDB: true,
    runMeasure: true
};
