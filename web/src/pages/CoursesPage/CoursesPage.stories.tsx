import type { ComponentMeta } from '@storybook/react'

import CoursesPage from './CoursesPage'

export const generated = () => {
  return <CoursesPage />
}

export default {
  title: 'Pages/CoursesPage',
  component: CoursesPage,
} as ComponentMeta<typeof CoursesPage>
