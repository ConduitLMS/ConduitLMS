import { render } from '@redwoodjs/testing/web'

import MarketplacePage from './MarketplacePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MarketplacePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MarketplacePage />)
    }).not.toThrow()
  })
})
