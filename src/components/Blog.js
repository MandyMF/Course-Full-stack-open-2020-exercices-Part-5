import React, { useState } from "react"

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible ? "none" : "" }
	const showWhenVisible = { display: visible ? "" : "none" }
	const username = JSON.parse(window.localStorage.getItem("loggedBlogappUser")).username

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	const toggleVisibility = () => {
		setVisible(!visible)
  }
	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible}>
				{blog.title} {blog.author}{" "}
				<button style={hideWhenVisible} onClick={toggleVisibility}>
					view
				</button>
			</div>

			<div style={showWhenVisible}>
				<div>
					{blog.title} {blog.author}{" "}
					<button style={showWhenVisible} onClick={toggleVisibility}>
						hidde
					</button>
				</div>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes} <button onClick={() => handleLikeBlog(blog)}>like</button>
				</div>
				<div>{blog.user.name}</div>
				<button style={blog.user.username === username ? {display:''} : {display: 'none'} } onClick={()=> handleDeleteBlog(blog)}>remove</button>
			</div>
		</div>
	)
}

export default Blog
