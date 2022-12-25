import type { ComponentMeta } from '@storybook/react'

import OrganizationPage from './OrganizationPage'

export const generated = () => {
  return <OrganizationPage />
}

export default {
  title: 'Pages/OrganizationPage',
  component: OrganizationPage,
} as ComponentMeta<typeof OrganizationPage>
