import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification  from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message:'', success:false, display:false })
  const [blogsSorted, setBlogsSorted] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const getData = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    setBlogsSorted(blogs.sort((blog1, blog2) => {
      return blog2.likes - blog1.likes
    }))
  }, [blogs])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ success:false, display:false, message:'' })
    } catch (exception) {
      console.error('ERROR ON LOGIN IN')
      setNotification({ success:false, display:true, message:'wrong username or password' })
      setTimeout(() => {
        setNotification({ success:false, display:false, message:'' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleDeleteBlog = async blog => {

    if(!(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)))
    {
      return
    }

    try{

      await blogService.deleteBlog(blog)

      setNotification({ success:true, message:`blog ${blog.title} by ${blog.author} has been deleted`, display:true })
      setTimeout(() => {
        setNotification({ success:false, display:false, message:'' })
      }, 5000)

      setBlogs(blogs.filter(item => {
        return item.id === blog.id ? false : true
      }))
    }
    catch(exception)
    {
      setNotification({ success:false, display:true, message:`blog ${blog.title} by ${blog.author} could not be deleted` })

      setTimeout(() => {
        setNotification({ success:false, display:false, message:'' })
      }, 5000)
    }
  }

  const handleLikeBlog =  async blog => {
    try
    {
      await blogService.likeBlog(blog)

      setBlogs(blogs.map(item => {
        if(item.id === blog.id)
        {
          const likedBlog = { ...item }
          likedBlog.likes += 1
          return likedBlog
        }
        return item
      }))
    }
    catch(exception){
      setNotification({ success:false, display:true, message:`blog ${blog.title} by ${blog.author} could not be liked` })

      setTimeout(() => {
        setNotification({ success:false, display:false, message:'' })
      }, 5000)
    }

  }

  const CreateBlog = async (blogToCreate) => {

    try {
      let newblog = await blogService.createBlog(
        {
          ...blogToCreate
        }
      )
      const user_info =  JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      newblog.user = { id:newblog.user ,username: user_info.username, name: user_info.name }

      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newblog))

      setNotification({ success:true, message:`a new blog ${blogToCreate.title} by ${blogToCreate.author} added`, display:true })
      setTimeout(() => {
        setNotification({ success:false, display:false, message:'' })
      }, 5000)

    } catch (exception) {
      console.error('ERROR CREATING BLOG')

      setNotification({ success:false, message:`a new blog ${blogToCreate.title} by ${blogToCreate.author} could not be added`, display:true })

      setTimeout(() => {
        setNotification({ success:false, display:false, message:'' })
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h1>log in to the application</h1>
      <Notification {...notification} />
      <form onSubmit={handleLogin}>
        <div>
					username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
					password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )

  const createNewBlogForm = () => (
    <Togglable
      buttonLabel='create new blog'
      ref={blogFormRef}>
      <BlogForm CreateBlog={CreateBlog} />
    </Togglable>
  )

  const blogList = () => (
    <>
      <h2>blogs</h2>
      <Notification {...notification}/>
      <div>
        <p>
          {user.name} logged in <button id="logout-button" onClick={handleLogout}> logout </button>
        </p>
      </div>
      {createNewBlogForm()}
      <ul style={{padding: '0'}}>
      {blogsSorted.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} handleDeleteBlog={handleDeleteBlog} username={user.username}/>
      ))}
      </ul>
    </>
  )

  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
