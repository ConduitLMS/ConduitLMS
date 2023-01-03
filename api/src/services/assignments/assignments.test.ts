import type { Assignment } from '@prisma/client'

import {
  assignments,
  assignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from './assignments'
import type { StandardScenario } from './assignments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('assignments', () => {
  scenario('returns all assignments', async (scenario: StandardScenario) => {
    const result = await assignments()

    expect(result.length).toEqual(Object.keys(scenario.assignment).length)
  })

  scenario(
    'returns a single assignment',
    async (scenario: StandardScenario) => {
      const result = await assignment({ id: scenario.assignment.one.id })

      expect(result).toEqual(scenario.assignment.one)
    }
  )

  scenario('creates a assignment', async (scenario: StandardScenario) => {
    const result = await createAssignment({
      input: {
        name: 'String1957437',
        description: 'String',
        userId: scenario.assignment.two.userId,
        organizationId: scenario.assignment.two.organizationId,
        assignedDate: '2022-12-29T03:09:31.187Z',
        dueDate: '2022-12-29T03:09:31.187Z',
      },
    })

    expect(result.name).toEqual('String1957437')
    expect(result.description).toEqual('String')
    expect(result.userId).toEqual(scenario.assignment.two.userId)
    expect(result.organizationId).toEqual(
      scenario.assignment.two.organizationId
    )
    expect(result.assignedDate).toEqual(new Date('2022-12-29T03:09:31.187Z'))
    expect(result.dueDate).toEqual(new Date('2022-12-29T03:09:31.187Z'))
  })

  scenario('updates a assignment', async (scenario: StandardScenario) => {
    const original = (await assignment({
      id: scenario.assignment.one.id,
    })) as Assignment
    const result = await updateAssignment({
      id: original.id,
      input: { name: 'String48853012' },
    })

    expect(result.name).toEqual('String48853012')
  })

  scenario('deletes a assignment', async (scenario: StandardScenario) => {
    const original = (await deleteAssignment({
      id: scenario.assignment.one.id,
    })) as Assignment
    const result = await assignment({ id: original.id })

    expect(result).toEqual(null)
  })
})
