
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, jsonDisplay, timeTag,  } from 'src/lib/formatters'

import type { DeleteModuleMutationVariables, FindModuleById } from 'types/graphql'

const DELETE_MODULE_MUTATION = gql`
  mutation DeleteModuleMutation($id: Int!) {
    deleteModule(id: $id) {
      id
    }
  }
`

interface Props {
  module: NonNullable<FindModuleById['module']>
}

const Module = ({ module }: Props) => {
  const [deleteModule] = useMutation(DELETE_MODULE_MUTATION, {
    onCompleted: () => {
      toast.success('Module deleted')
      navigate(routes.modules())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteModuleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete module ' + id + '?')) {
      deleteModule({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Module {module.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{module.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{module.name}</td>
            </tr><tr>
              <th>Description</th>
              <td>{module.description}</td>
            </tr><tr>
              <th>Module type</th>
              <td>{formatEnum(module.moduleType)}</td>
            </tr><tr>
              <th>Question json</th>
              <td>{jsonDisplay(module.questionJson)}</td>
            </tr><tr>
              <th>Answer key</th>
              <td>{jsonDisplay(module.answerKey)}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(module.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(module.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editModule({ id: module.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(module.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Module
