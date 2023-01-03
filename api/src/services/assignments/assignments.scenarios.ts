import type { Prisma, Assignment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AssignmentCreateArgs>({
  assignment: {
    one: {
      data: {
        name: 'String399410',
        description: 'String',
        assignedDate: '2022-12-29T03:09:31.198Z',
        dueDate: '2022-12-29T03:09:31.198Z',
        user: {
          create: {
            hashedPassword: 'String',
            salt: 'String',
            email: 'String6409434',
            organization: {
              create: { name: 'String', updatedAt: '2022-12-29T03:09:31.198Z' },
            },
          },
        },
        organization: {
          create: { name: 'String', updatedAt: '2022-12-29T03:09:31.198Z' },
        },
      },
    },
    two: {
      data: {
        name: 'String2697868',
        description: 'String',
        assignedDate: '2022-12-29T03:09:31.198Z',
        dueDate: '2022-12-29T03:09:31.198Z',
        user: {
          create: {
            hashedPassword: 'String',
            salt: 'String',
            email: 'String3909704',
            organization: {
              create: { name: 'String', updatedAt: '2022-12-29T03:09:31.198Z' },
            },
          },
        },
        organization: {
          create: { name: 'String', updatedAt: '2022-12-29T03:09:31.198Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Assignment, 'assignment'>
