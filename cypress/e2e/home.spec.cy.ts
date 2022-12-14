describe('testing App', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('creating a burger order', () => {
    cy.visit('http://localhost:3000')
    cy.get('#60d3b41abdacab0026a733c6').click()
    cy.wait(2000)
    cy.get('#close_btn').click()
    cy.get('#60d3b41abdacab0026a733c6').drag('#drop')
    cy.get('#60d3b41abdacab0026a733cc').drag('#drop')
    cy.get('#60d3b41abdacab0026a733cb').drag('#drop')
    cy.wait(2000)
    cy.get('button').contains('Оформить заказ').click()
    cy.get('form')
    cy.get('input[name=email]').type('druss25@yandex.ru').should('have.value', 'druss25@yandex.ru')
    cy.get('input[name=password]').type('123456').should('have.value', '123456')
    cy.wait(2000)
    cy.get('form').submit()
    cy.wait(2000)
    cy.get('button').contains('Оформить заказ').click()
    cy.wait(20000)
    cy.get('#close_btn').click()
    cy.get('#profile').click()
    cy.wait(2000)
    cy.get('button').contains('Выход').click()
  })

  it('list menu header', () => {
    cy.wait(2000)
    cy.get('#feed').click()
    cy.wait(2000)
    cy.get('#profile').click()
    cy.wait(2000)
    cy.get('#home').click()
  })
})
