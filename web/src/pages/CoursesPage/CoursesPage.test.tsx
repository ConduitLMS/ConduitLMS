import { render } from '@redwoodjs/testing/web'

import CoursesPage from './CoursesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CoursesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CoursesPage />)
    }).not.toThrow()
  })
})
