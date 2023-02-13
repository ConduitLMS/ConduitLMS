import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Module/ModulesCell'
import { formatEnum, jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteModuleMutationVariables, FindModules } from 'types/graphql'

const DELETE_MODULE_MUTATION = gql`
  mutation DeleteModuleMutation($id: Int!) {
    deleteModule(id: $id) {
      id
    }
  }
`

const ModulesList = ({ modules }: FindModules) => {
  const [deleteModule] = useMutation(DELETE_MODULE_MUTATION, {
    onCompleted: () => {
      toast.success('Module deleted')
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

  const onDeleteClick = (id: DeleteModuleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete module ' + id + '?')) {
      deleteModule({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Module type</th>
            <th>Question json</th>
            <th>Answer key</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{truncate(module.id)}</td>
              <td>{truncate(module.name)}</td>
              <td>{truncate(module.description)}</td>
              <td>{formatEnum(module.moduleType)}</td>
              <td>{jsonTruncate(module.questionJson)}</td>
              <td>{jsonTruncate(module.answerKey)}</td>
              <td>{timeTag(module.createdAt)}</td>
              <td>{timeTag(module.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.module({ id: module.id })}
                    title={'Show module ' + module.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editModule({ id: module.id })}
                    title={'Edit module ' + module.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete module ' + module.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(module.id)}
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

export default ModulesList
