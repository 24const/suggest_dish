'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/suggestdish-dev'
  },
  appUrl: 'http://localhost:9000',

  seedDB: true
};
