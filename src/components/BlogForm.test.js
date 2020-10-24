import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { act } from 'react-dom/test-utils'

describe('<BlogForm /> tests', () => {

  test('BlogForm submit should call the event handler it recieved as props with the correct data ', async () => {
    const rawBlog ={
      title: 'New Title',
      author: 'New Author',
      url: 'NewUrl@new.com'
    }
    const mock_handleCreateBlog = jest.fn()

    const component = render(<BlogForm CreateBlog={mock_handleCreateBlog} />)

    const mainform = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target:{
        value: rawBlog.title
      }
    })

    fireEvent.change(authorInput, {
      target:{
        value: rawBlog.author
      }
    })

    fireEvent.change(urlInput, {
      target:{
        value: rawBlog.url
      }
    })

    fireEvent.submit(mainform)

    expect(mock_handleCreateBlog.mock.calls).toHaveLength(1)
    //expect(mock_handleCreateBlog).toHaveBeenCalledWith(rawBlog)
    expect(mock_handleCreateBlog.mock.calls[0][0]).toEqual(rawBlog)
  })
})
