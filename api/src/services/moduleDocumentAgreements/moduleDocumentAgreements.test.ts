import type { ModuleDocumentAgreement } from '@prisma/client'

import {
  moduleDocumentAgreements,
  moduleDocumentAgreement,
  createModuleDocumentAgreement,
  updateModuleDocumentAgreement,
  deleteModuleDocumentAgreement,
} from './moduleDocumentAgreements'
import type { StandardScenario } from './moduleDocumentAgreements.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('moduleDocumentAgreements', () => {
  scenario(
    'returns all moduleDocumentAgreements',
    async (scenario: StandardScenario) => {
      const result = await moduleDocumentAgreements()

      expect(result.length).toEqual(
        Object.keys(scenario.moduleDocumentAgreement).length
      )
    }
  )

  scenario(
    'returns a single moduleDocumentAgreement',
    async (scenario: StandardScenario) => {
      const result = await moduleDocumentAgreement({
        id: scenario.moduleDocumentAgreement.one.id,
      })

      expect(result).toEqual(scenario.moduleDocumentAgreement.one)
    }
  )

  scenario('creates a moduleDocumentAgreement', async () => {
    const result = await createModuleDocumentAgreement({
      input: {
        name: 'String2562586',
        description: 'String',
        content: 'String',
        attachments: 'String',
        confirm: true,
      },
    })

    expect(result.name).toEqual('String2562586')
    expect(result.description).toEqual('String')
    expect(result.content).toEqual('String')
    expect(result.attachments).toEqual('String')
    expect(result.confirm).toEqual(true)
  })

  scenario(
    'updates a moduleDocumentAgreement',
    async (scenario: StandardScenario) => {
      const original = (await moduleDocumentAgreement({
        id: scenario.moduleDocumentAgreement.one.id,
      })) as ModuleDocumentAgreement
      const result = await updateModuleDocumentAgreement({
        id: original.id,
        input: { name: 'String33326412' },
      })

      expect(result.name).toEqual('String33326412')
    }
  )

  scenario(
    'deletes a moduleDocumentAgreement',
    async (scenario: StandardScenario) => {
      const original = (await deleteModuleDocumentAgreement({
        id: scenario.moduleDocumentAgreement.one.id,
      })) as ModuleDocumentAgreement
      const result = await moduleDocumentAgreement({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
