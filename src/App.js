import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification  from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
  const [loginNotification, setLoginNotification] = useState(<></>)
  const [createNotification, setCreateNotification] = useState(<></>)

	const [user, setUser] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const blogFormRef = useRef()

	const getData = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
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

			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
      console.error("ERROR ON LOGIN IN")
      setLoginNotification(<Notification success={false} message="wrong username or password" />)
      setTimeout(() => {
        setLoginNotification(<></>)
      }, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
	}

	const handleLikeBlog =  async blog =>{
		await blogService.likeBlog(blog)
		getData()
	}

	const CreateBlog = async (blogToCreate) => {

		try {
      const newblog = await blogService.createBlog(
        {
					...blogToCreate
        }
      )
			blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newblog))

      setCreateNotification(<Notification success={true} message={`a new blog ${blogToCreate.title} by ${blogToCreate.author} added`}/>)
      setTimeout(()=>{
        setCreateNotification(<></>)
      }, 5000)

		} catch (exception) {
      console.error("ERROR CREATING BLOG")
      
      setCreateNotification(<Notification success={false} message={`a new blog ${blogToCreate.title} by ${blogToCreate.author} could not be added`}/>)

      setTimeout(()=>{
        setCreateNotification(<></>)
      }, 5000)
		}
	}

	const loginForm = () => (
		<>
			<h1>log in to the application</h1>
      {loginNotification}
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
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
      {createNotification}
			<div>
				<p>
					{user.name} logged in <button onClick={handleLogout}> logout </button>
				</p>
			</div>
			{createNewBlogForm()}

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} />
			))}
		</>
	)

	return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
