import type { Prisma, Organization } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationCreateArgs>({
  organization: {
    one: {
      data: { name: 'String7829744', updatedAt: '2022-12-24T13:57:23.602Z' },
    },
    two: {
      data: { name: 'String5715581', updatedAt: '2022-12-24T13:57:23.602Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Organization, 'organization'>
