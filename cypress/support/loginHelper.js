// cypress/support/loginHelper.js
export function loginWithBody() {
  const username = Cypress.env('TEST_USERNAME') || 'Ochko228'
  const password = Cypress.env('TEST_PASSWORD') || 'Zxcvbn'

  cy.visit('/', { timeout: 30000, failOnStatusCode: false })
  cy.wait(2000)

  // 1. Открываем форму логина
  cy.contains('div', 'Login').click({ force: true })

  // 2. Ждём появления инпутов (примерные селекторы – нужно подсмотреть в DevTools)
  cy.get('input').eq(0).should('be.visible').type(String(username), { delay: 100 })
  cy.get('input').eq(1).should('be.visible').type(String(password), { delay: 100 })

  // 3. Нажимаем кнопку входа / отправляем форму
  cy.contains('button,div', 'Login').last().click({ force: true })
}
