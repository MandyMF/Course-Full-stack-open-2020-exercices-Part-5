import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlogData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, newBlogData, config)
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.delete(baseUrl+`/${blogToDelete.id}`, config)
  return response.data
}


const likeBlog = async (blog) => {
  const response = await axios.put(baseUrl + `/${blog.id}`, {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  })

  return response.data
}

export default { getAll, setToken, createBlog, likeBlog, deleteBlog }
