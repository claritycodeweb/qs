'use strict';

// Test specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://127.0.0.1/qs-test'
    },

    // Seed database on startup
    seedDB: false,
    runMeasure: false,
    inMemoryDb: true
}
