import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    props.CreateBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
        <div>
					title:
          <input
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
					author:
          <input
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
					url:
          <input
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>

        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  CreateBlog: PropTypes.func.isRequired
}

export default BlogForm
