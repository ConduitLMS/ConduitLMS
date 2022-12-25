import type { Prisma, Role } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RoleCreateArgs>({
  role: {
    one: {
      data: {
        name: 'String6393186',
        level: 5035397,
        updatedAt: '2022-12-24T14:10:54.928Z',
      },
    },
    two: {
      data: {
        name: 'String9626915',
        level: 6121582,
        updatedAt: '2022-12-24T14:10:54.928Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Role, 'role'>
