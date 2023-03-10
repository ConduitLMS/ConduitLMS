import type {
  DeleteAssignmentMutationVariables,
  FindAssignments,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Assignment/AssignmentsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation DeleteAssignmentMutation($id: Int!) {
    deleteAssignment(id: $id) {
      id
    }
  }
`

const AssignmentsList = ({ assignments }: FindAssignments) => {
  const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Assignment deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteAssignmentMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete assignment ' + id + '?')) {
      deleteAssignment({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Idz</th>
            <th>Name</th>
            <th>Description</th>
            <th>User id</th>
            <th>Organization id</th>
            <th>Assigned date</th>
            <th>Due date</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{truncate(assignment.id)}</td>
              <td>{truncate(assignment.name)}</td>
              <td>{truncate(assignment.description)}</td>
              <td>{truncate(assignment.userId)}</td>
              <td>{truncate(assignment.organizationId)}</td>
              <td>{timeTag(assignment.assignedDate)}</td>
              <td>{timeTag(assignment.dueDate)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.assignment({ id: assignment.id })}
                    title={'Show assignment ' + assignment.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAssignment({ id: assignment.id })}
                    title={'Edit assignment ' + assignment.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete assignment ' + assignment.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(assignment.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AssignmentsList
