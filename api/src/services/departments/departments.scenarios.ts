import type { Prisma, Department } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DepartmentCreateArgs>({
  department: {
    one: {
      data: {
        name: 'String7197378',
        updatedAt: '2022-12-24T14:10:44.567Z',
        organization: {
          create: {
            name: 'String7858617',
            updatedAt: '2022-12-24T14:10:44.567Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String1889913',
        updatedAt: '2022-12-24T14:10:44.567Z',
        organization: {
          create: {
            name: 'String2070613',
            updatedAt: '2022-12-24T14:10:44.567Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Department, 'department'>
