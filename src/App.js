import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			blogService.setToken(user)
			setUser(user)
			setUsername("")
			setPassword("")
		} catch (exception) {
			console.error("ERROR LOGIN IN")
		}
	}

	const loginForm = () => (
		<>
			<h1>log in to the application</h1>
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

	const blogList = () => (
		<>
			<h2>blogs</h2>

			<div>
				<p>{user.name} logged in</p>
			</div>

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</>
	)

	return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
