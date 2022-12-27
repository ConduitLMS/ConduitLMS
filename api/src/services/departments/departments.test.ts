import type { Department } from '@prisma/client'

import {
  departments,
  department,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from './departments'
import type { StandardScenario } from './departments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('departments', () => {
  scenario('returns all departments', async (scenario: StandardScenario) => {
    const result = await departments()

    expect(result.length).toEqual(Object.keys(scenario.department).length)
  })

  scenario(
    'returns a single department',
    async (scenario: StandardScenario) => {
      const result = await department({ id: scenario.department.one.id })

      expect(result).toEqual(scenario.department.one)
    }
  )

  scenario('creates a department', async (scenario: StandardScenario) => {
    const result = await createDepartment({
      input: {
        name: 'String5891332',
        updatedAt: '2022-12-26T20:37:43.223Z',
        organizationId: scenario.department.two.organizationId,
      },
    })

    expect(result.name).toEqual('String5891332')
    expect(result.updatedAt).toEqual(new Date('2022-12-26T20:37:43.223Z'))
    expect(result.organizationId).toEqual(
      scenario.department.two.organizationId
    )
  })

  scenario('updates a department', async (scenario: StandardScenario) => {
    const original = (await department({
      id: scenario.department.one.id,
    })) as Department
    const result = await updateDepartment({
      id: original.id,
      input: { name: 'String81992472' },
    })

    expect(result.name).toEqual('String81992472')
  })

  scenario('deletes a department', async (scenario: StandardScenario) => {
    const original = (await deleteDepartment({
      id: scenario.department.one.id,
    })) as Department
    const result = await department({ id: original.id })

    expect(result).toEqual(null)
  })
})
