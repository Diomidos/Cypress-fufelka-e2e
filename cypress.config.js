// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL || 'https://fufelka.ru',
        viewportWidth: 1920,
        viewportHeight: 1080,
        defaultCommandTimeout: 20000,
        video: false,
        screenshotOnRunFailure: true,
        experimentalSessionAndOrigin: false,
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
        env: {
            TEST_USERNAME: process.env.CYPRESS_TEST_USERNAME,
            TEST_PASSWORD: process.env.CYPRESS_TEST_PASSWORD,
        }
    },
})
