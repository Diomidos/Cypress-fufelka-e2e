import { setSecretKey } from '../support/secretKey'
import { TEST_USER } from '../support/credentials'

describe('E2E: логин → сессия → профиль → смена аватара', () => {
  beforeEach(() => {
    setSecretKey()
  })

  it('e2e тест: логин, сессия, профиль, аватар', () => {
    // Вход в приложение
    cy.visit('/', { timeout: 30000, failOnStatusCode: false })
    cy.contains('div,button', 'Login').click({ force: true })
    cy.intercept('POST', '**/api/auth/**').as('authLogin')
    cy.get('input').eq(0).should('be.visible').clear().type(TEST_USER.email, { delay: 50 })
    cy.get('input').eq(1).should('be.visible').clear().type(TEST_USER.password, { delay: 50 })
    cy.contains('button,div', 'Login').first().click({ force: true })
    cy.wait('@authLogin', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.be.within(200, 399)    })
    // Проверка успешной авторизации
    cy.url().should('include', '/dashboard')
    cy.get('[aria-label="user-avatar"]').should('be.visible')
    cy.get('[aria-label="user-login"]').should('be.visible').and('contain', 'Ochko228')
    // Проверка сессии после перезагрузки страницы
    cy.reload()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
    cy.get('[aria-label="user-avatar"]').should('be.visible')
    cy.get('[aria-label="user-login"]').should('be.visible').and('contain', 'Ochko228')
    // Проверка данных в профиле
    cy.get('[aria-label="user-avatar"]').should('be.visible').click({ force: true });
    // Клик по иконке Редактирования профиля
    cy.get('.sc-cCVJLD.cQwCjn', { timeout: 10000 }).eq(4).click({ force: true });
    // 2. Клик по кнопке Добавления аватара
    cy.get('.sc-lehtBJ.eEOqwh').first().click({ force: true });
    // 3. Клик по кнопке Загрузка файла
    cy.get('.sc-dntSTA.dghYqp').wait(3000).click({ force: true });
    // Ждем появления поля загрузки
    cy.get('input[type="file"]')
      .should('exist')
      .invoke('css', 'display', 'block')
      .selectFile('cypress/fixtures/avatar.jpg', { force: true });
    // Клик по кнопке Сохранить
    cy.get('.sc-cOpnSz.bdMKUD.button.button-save')
      .should('have.attr', 'aria-label', 'disabled-false') // Проверка что кнопка активна
      .click({ force: true });
    cy.wait(1000);
  });
});

