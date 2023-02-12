import type { Prisma, Module } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ModuleCreateArgs>({
  module: {
    one: {
      data: {
        name: 'String',
        moduleType: 'DOCUMENTAPPROVAL',
        updatedAt: '2023-02-12T02:55:17.366Z',
      },
    },
    two: {
      data: {
        name: 'String',
        moduleType: 'DOCUMENTAPPROVAL',
        updatedAt: '2023-02-12T02:55:17.366Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Module, 'module'>
