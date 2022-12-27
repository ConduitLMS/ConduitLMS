import type { Prisma, Department } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DepartmentCreateArgs>({
  department: {
    one: {
      data: {
        name: 'String7093262',
        updatedAt: '2022-12-26T20:37:43.242Z',
        organization: {
          create: { name: 'String', updatedAt: '2022-12-26T20:37:43.242Z' },
        },
      },
    },
    two: {
      data: {
        name: 'String9806785',
        updatedAt: '2022-12-26T20:37:43.242Z',
        organization: {
          create: { name: 'String', updatedAt: '2022-12-26T20:37:43.242Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Department, 'department'>
