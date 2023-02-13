import type { Module } from '@prisma/client'

import {
  modules,
  module,
  createModule,
  updateModule,
  deleteModule,
} from './modules'
import type { StandardScenario } from './modules.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('modules', () => {
  scenario('returns all modules', async (scenario: StandardScenario) => {
    const result = await modules()

    expect(result.length).toEqual(Object.keys(scenario.module).length)
  })

  scenario('returns a single module', async (scenario: StandardScenario) => {
    const result = await module({ id: scenario.module.one.id })

    expect(result).toEqual(scenario.module.one)
  })

  scenario('creates a module', async () => {
    const result = await createModule({
      input: {
        name: 'String',
        moduleType: 'DOCUMENTAPPROVAL',
        updatedAt: '2023-02-12T02:55:17.357Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.moduleType).toEqual('DOCUMENTAPPROVAL')
    expect(result.updatedAt).toEqual(new Date('2023-02-12T02:55:17.357Z'))
  })

  scenario('updates a module', async (scenario: StandardScenario) => {
    const original = (await module({ id: scenario.module.one.id })) as Module
    const result = await updateModule({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a module', async (scenario: StandardScenario) => {
    const original = (await deleteModule({
      id: scenario.module.one.id,
    })) as Module
    const result = await module({ id: original.id })

    expect(result).toEqual(null)
  })
})
