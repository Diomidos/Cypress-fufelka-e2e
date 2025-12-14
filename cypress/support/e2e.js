require('./credentials')

// Глобальные хуки
beforeEach(() => {
  cy.log(`Запуск теста: ${Cypress.currentTest.title}`)
})

// Кастомная команда авторизации
Cypress.Commands.add('safeType', (selector, text, options = {}) => {
  const opts = { ...options, log: text.includes('password') ? false : true }
  return cy.get(selector).clear().type(text, opts)
})