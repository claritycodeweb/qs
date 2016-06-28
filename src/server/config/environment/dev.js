'use strict';

// Development specific configuration
// ==================================
module.exports = {

    // MongoDB connection
    mongo: {
        uri: 'mongodb://127.0.0.1/qs-dev'
    },

    // Seed database on startup
    seedDB: true,
    runMeasure: true
};
