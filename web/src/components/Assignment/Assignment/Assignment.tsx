import type {
  DeleteAssignmentMutationVariables,
  FindAssignmentById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation DeleteAssignmentMutation($id: Int!) {
    deleteAssignment(id: $id) {
      id
    }
  }
`

interface Props {
  assignment: NonNullable<FindAssignmentById['assignment']>
}

const Assignment = ({ assignment }: Props) => {
  const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Assignment deleted')
      navigate(routes.assignments())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteAssignmentMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete assignment ' + id + '?')) {
      deleteAssignment({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Assignment {assignment.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{assignment.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{assignment.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{assignment.description}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{assignment.userId}</td>
            </tr>
            <tr>
              <th>Organization id</th>
              <td>{assignment.organizationId}</td>
            </tr>
            <tr>
              <th>Assigned date</th>
              <td>{timeTag(assignment.assignedDate)}</td>
            </tr>
            <tr>
              <th>Due date</th>
              <td>{timeTag(assignment.dueDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAssignment({ id: assignment.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(assignment.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Assignment
