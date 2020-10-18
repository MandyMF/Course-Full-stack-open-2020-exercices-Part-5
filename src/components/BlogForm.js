import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    await props.CreateBlog({ title, author, url })

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
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
					author:
          <input
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
					url:
          <input
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  CreateBlog: PropTypes.func.isRequired
}

export default BlogForm
