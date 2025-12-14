export function setSecretKey() {
  cy.window().then((win) => {
    win.localStorage.setItem('sk', 'YJyKb5bbs0XkjR5DmPrD')
  })
}
