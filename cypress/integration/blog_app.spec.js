describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user= {
      username: 'username1',
      password: 'password1',
      name:'name1'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form').should('contain', 'login')
  })

  
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('username1')
      cy.get('#password').type('password1')
      cy.contains('login').click()
      cy.contains('name1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('username1')
      cy.get('#password').type('password2')
      cy.contains('login').click()
      cy.contains('wrong username or password')
      cy.get('.error')
      .should('contain','wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})