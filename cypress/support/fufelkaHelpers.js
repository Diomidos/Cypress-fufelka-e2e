import { loginWithBody } from './loginHelper'

export function interceptAnyPost() {
  cy.intercept('POST', '**').as('anyPostRequest')
}

export function loginAndWaitPost() {
  interceptAnyPost()
  loginWithBody()

  cy.wait('@anyPostRequest', { timeout: 10000 }).then((interception) => {
    if (!interception) {
      cy.log('POST не перехвачен')
      return
    }

    const status = interception.response && interception.response.statusCode
    cy.log(`Перехвачен POST: ${interception.request.url}, статус: ${status}`)
    expect(status).to.be.within(200, 399)
  })
}

export function logUrlsAfterLoginAndReload() {
  cy.wait(3000)
  cy.url().then((url) => cy.log('URL после логина: ' + url))

  cy.reload()
  cy.wait(2000)
  cy.url().then((url) => cy.log('URL после перезагрузки: ' + url))
}
