/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function(){
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
      const longText = 'Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo'
      
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tall')
      cy.get('#email').type('fulanodetall@email.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tall')
      cy.get('#email').type('fulanodetall@email,com')
      cy.get('#open-text-area').type('Teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function(){
      cy.get('#phone')
        .type('abcdefjhij')
        .should('have.value', '')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tall')
      cy.get('#email').type('fulanodetall@email.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefon', function(){
      cy.get('#firstName')
        .type('Fulano')
        .should('have.value', 'Fulano')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('de Tall')
        .should('have.value', 'de Tall')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('fulanodetall@email.com')
        .should('have.value', 'fulanodetall@email.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
    })

    it.only('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

  })
  