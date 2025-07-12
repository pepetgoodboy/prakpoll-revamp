const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
