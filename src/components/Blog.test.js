import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

describe('<Blog /> tests', () => {

  const initialBlog = {
    title: 'My firstone',
    author: 'MMF',
    likes: '69',
    url: 'nowhere@noplace.now',
    user:{
      name:'MMF name',
      username:'MMF'
    }
  }

  beforeEach(() => {
  })

  test('components show title and author by default, but not does not show url or number of likes ', () => {

    const component = render(
      <Blog blog={initialBlog} username={initialBlog.user.username}
      />
    )
    const div_defaultInfo = component.container.querySelector('.blogDefaultInfo')
    expect(div_defaultInfo).not.toHaveStyle('display:none')
    expect(div_defaultInfo).toHaveTextContent('My firstone MMF ')

    const div_extendedInfo = component.container.querySelector('.blogAditionalInfo')
    expect(div_extendedInfo).toHaveStyle('display:none')
    expect(div_extendedInfo).toHaveTextContent('nowhere@noplace.now')
    expect(div_extendedInfo).toHaveTextContent('69')

  })

  test('component show aditional info after been clicked', () =>
  {

    const component = render(
      <Blog blog={initialBlog} username={initialBlog.user.username}
      />
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const div_extendedInfo = component.container.querySelector('.blogAditionalInfo')
    expect(div_extendedInfo).not.toHaveStyle('display:none')
  })

  test('like button test if click twice', () => {

    const mock_handleLikeBlog = jest.fn()
    const component = render(
      <Blog handleLikeBlog={mock_handleLikeBlog} blog={initialBlog} username={initialBlog.user.username}
      />
    )

    const like_button = component.getByText('like')
    fireEvent.click(like_button)
    fireEvent.click(like_button)

    expect(mock_handleLikeBlog.mock.calls).toHaveLength(2)
  })


})
