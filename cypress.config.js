const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://metadata-server-mock.herokuapp.com/metadata/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
