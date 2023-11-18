/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(function(){
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
      const longText = 'Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo, Teste de escrita no campo'
      
      cy.clock()

      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tall')
      cy.get('#email').type('fulanodetall@email.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)
      
      cy.get('.success').should('not.be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.clock()
      
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tall')
      cy.get('#email').type('fulanodetall@email,com')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
      
      cy.tick(THREE_SECONDS_IN_MS)
      
      cy.get('.error').should('not.be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function(){
      cy.get('#phone')
        .type('abcdefjhij')
        .should('have.value', '')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.clock()    

      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tall')
      cy.get('#email').type('fulanodetall@email.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
      
      cy.tick(THREE_SECONDS_IN_MS)
      
      cy.get('.error').should('not.be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
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

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
     cy.clock()
     
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
      
      cy.tick(THREE_SECONDS_IN_MS)
      
      cy.get('.error').should('not.be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', function(){
      cy.clock()

      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
        .should("not.have.value")
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
      })
      
      it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a').click()
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })
  })
  