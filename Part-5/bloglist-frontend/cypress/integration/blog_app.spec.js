describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
            const user = {
              name: 'LOL',
              username: 'lol',
              password: 'lol'
            }
            cy.request('POST', 'http://localhost:3001/api/users/', user)
            cy.visit('http://localhost:3000')
        })
    
    it('front page can be opened', function() {
        cy.contains('blogs')
    })
    it('login form is shown and can be opened', function() {
        cy.contains('login').click()
        })
    it('user login succeeds with correct credentials', function () {
        cy.contains('login').click()
        cy.get('#username').type('lol')
        cy.get('#password').type('lol')
        cy.get('#login-button').click()
        cy.contains('LOL logged-in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
          cy.contains('login').click()
          cy.get('input:first').type('lol')
          cy.get('input:last').type('lol')
          cy.get('#login-button').click()
        })
    
        it('a blog can be created', function() {
          cy.contains('new note').click()
          cy.get('input:first').type('a note created by cypress')
          cy.contains('save').click()
          cy.contains('a note created by cypress')
        })
      })

      it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('lol')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.contains('Wrong credentials')
        })
})