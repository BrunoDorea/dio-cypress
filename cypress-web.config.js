const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    nameDefault: 'Bruno',
    emailDefault: 'bruno@email.com',
    passwordDefault: '123456',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Conduit Automation Tests',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://conduit-realworld-example-app.fly.dev/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
