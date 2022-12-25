import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String8388850',
        organization: {
          create: {
            name: 'String1947271',
            updatedAt: '2022-12-24T14:10:22.924Z',
          },
        },
      },
    },
    two: {
      data: {
        email: 'String5863632',
        organization: {
          create: {
            name: 'String1839060',
            updatedAt: '2022-12-24T14:10:22.924Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
