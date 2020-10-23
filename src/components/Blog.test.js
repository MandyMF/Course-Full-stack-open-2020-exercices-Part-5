import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> tests', () => {

  let component

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
    component = render(
      <Blog blog={initialBlog} username={initialBlog.user.username}
      />
    )
  })

  test('components show title and author by default, but not does not show url or number of likes ', () => {

    const div_defaultInfo = component.container.querySelector('.blogDefaultInfo')
    expect(div_defaultInfo).not.toHaveStyle('display:none')
    expect(div_defaultInfo).toHaveTextContent('My firstone MMF ')

    const div_extendedInfo = component.container.querySelector('.blogAditionalInfo')
    expect(div_extendedInfo).toHaveStyle('display:none')
    expect(div_extendedInfo).toHaveTextContent('nowhere@noplace.now')
    expect(div_extendedInfo).toHaveTextContent('69')

  })

})
