Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('de Tall')
    cy.get('#email').type('fulanodetall@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})