import type { FindAssignmentById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Assignment from 'src/components/Assignment/Assignment'

export const QUERY = gql`
  query FindAssignmentById($id: Int!) {
    assignment: assignment(id: $id) {
      id
      name
      description
      userId
      organizationId
      assignedDate
      dueDate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Assignment not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ assignment }: CellSuccessProps<FindAssignmentById>) => {
  return <Assignment assignment={assignment} />
}
