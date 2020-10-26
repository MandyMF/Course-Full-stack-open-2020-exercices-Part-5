describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user= {
      username: 'username1',
      password: 'password1',
      name:'name1'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    const user2= {
      username: 'username2',
      password: 'password2',
      name:'name2'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user2)

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
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('.error')
      .should('contain','wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(
        {
          username:"username1",
          password:"password1"
        }
      )
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('new and fresh blog to test')
      cy.get('#author').type('borringman')
      cy.get('#url').type('myurl@lol.com')

      cy.get('#create-blog-button').click()

      cy.contains('a new blog new and fresh blog to test by borringman added')
      cy.get('ul').contains('new and fresh blog to test borringman')
    })

    it('A user can like a blog', function() {
      cy.createBlog({
        title:'Blog to be liked',
        author:'author of such blog',
        url:'meeh@nop.com'
      })

      cy.contains('Blog to be liked author of such blog').find('button').as('viewButton')
      cy.get('@viewButton').click()

      cy.contains('Blog to be liked author of such blog').parent().as('focusDetailsBlog')

      cy.get('@focusDetailsBlog').contains('likes 0').find('button').as('likeButton')
      cy.get('@likeButton').click()

      cy.get('@focusDetailsBlog').contains('likes 1')
    })

    it('User that create a blog can delete it', function() {
      cy.createBlog({
        title:'Blog to be liked',
        author:'author of such blog',
        url:'meeh@nop.com'
      })

      cy.contains('Blog to be liked author of such blog').find('button').as('viewButton')
      cy.get('@viewButton').click()

      cy.contains('Blog to be liked author of such blog').parent().as('focusDetailsBlog')

      cy.get('@focusDetailsBlog').contains('remove').as('removeButton').should('exist')
      cy.get('@removeButton').click()

      cy.contains('blog Blog to be liked by author of such blog has been deleted').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Blog to be liked author of such blog').should('not.exist')
    })

    it('User that create did not create the blog can not delete it', function() {
      cy.createBlog({
        title:'Blog to be liked',
        author:'author of such blog',
        url:'meeh@nop.com'
      })

      cy.get('#logout-button').click()
      cy.login({username:"username2", password:"password2"})

      cy.contains('Blog to be liked author of such blog').find('button').as('viewButton')
      cy.get('@viewButton').click()

      cy.contains('Blog to be liked author of such blog').parent().as('focusDetailsBlog')

      cy.get('@focusDetailsBlog').contains('remove').should('not.exist')
    })
  })
})