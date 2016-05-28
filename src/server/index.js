'use strict';

// Set environment to dev (development)
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Export the application
exports = module.exports = require('./app')(require('./container'));
