import type { Prisma, Module } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ModuleCreateArgs>({
  module: {
    one: {
      data: {
        name: 'String',
        description: 'String',
        moduleType: 'DOCUMENTAPPROVAL',
        questionJson: { foo: 'bar' },
        answerKey: { foo: 'bar' },
        updatedAt: '2023-02-11T02:17:45.652Z',
      },
    },
    two: {
      data: {
        name: 'String',
        description: 'String',
        moduleType: 'DOCUMENTAPPROVAL',
        questionJson: { foo: 'bar' },
        answerKey: { foo: 'bar' },
        updatedAt: '2023-02-11T02:17:45.652Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Module, 'module'>
