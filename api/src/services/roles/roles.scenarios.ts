import type { Prisma, Role } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RoleCreateArgs>({
  role: {
    one: {
      data: {
        name: 'String1710444',
        level: 3292290,
        updatedAt: '2022-12-26T20:37:37.088Z',
      },
    },
    two: {
      data: {
        name: 'String4102441',
        level: 1308018,
        updatedAt: '2022-12-26T20:37:37.088Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Role, 'role'>
