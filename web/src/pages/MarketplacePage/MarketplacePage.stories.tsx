import type { ComponentMeta } from '@storybook/react'

import MarketplacePage from './MarketplacePage'

export const generated = () => {
  return <MarketplacePage />
}

export default {
  title: 'Pages/MarketplacePage',
  component: MarketplacePage,
} as ComponentMeta<typeof MarketplacePage>
