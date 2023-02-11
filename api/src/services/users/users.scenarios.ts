import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        hashedPassword: 'String',
        salt: 'String',
        email: 'String7419225',
      },
    },
    two: {
      data: {
        hashedPassword: 'String',
        salt: 'String',
        email: 'String8943001',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
