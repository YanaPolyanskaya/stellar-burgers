import * as orderFake from '../fixtures/order.json';

describe('test constructor', () => {
  beforeEach(() => {

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4001');
  });

  it('добавление ингредиента в конструктор', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('тестирование модального окна', () => {

      it('открытие модального окна', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });
    
      it('закрытие модальньго окна через крестик', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('закрытие модальньго окна через оверлей', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });
  });

  describe('тестирование создания заказа', () => {
    beforeEach(() => {
  
      cy.setCookie('accessToken', 'FAKE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'FAKE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('/');
    });

    it('тестирование оформления заказа', () => {

      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.enabled');

      cy.get('[data-order-button]').click();

      cy.get('#modals').children().should('have.length', 2);

      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFake.order.number
      );

      cy.get('[data-order-button]').should('be.disabled');
    });

    afterEach(() => {
   
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
