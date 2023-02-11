import type { Prisma, Organization } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationCreateArgs>({
  organization: {
    one: { data: { name: 'String', updatedAt: '2022-12-26T20:37:59.776Z' } },
    two: { data: { name: 'String', updatedAt: '2022-12-26T20:37:59.776Z' } },
  },
})

export type StandardScenario = ScenarioData<Organization, 'organization'>
