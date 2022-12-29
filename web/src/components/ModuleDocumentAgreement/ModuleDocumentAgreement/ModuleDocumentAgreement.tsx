
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag,  } from 'src/lib/formatters'

import type { DeleteModuleDocumentAgreementMutationVariables, FindModuleDocumentAgreementById } from 'types/graphql'

const DELETE_MODULE_DOCUMENT_AGREEMENT_MUTATION = gql`
  mutation DeleteModuleDocumentAgreementMutation($id: Int!) {
    deleteModuleDocumentAgreement(id: $id) {
      id
    }
  }
`

interface Props {
  moduleDocumentAgreement: NonNullable<FindModuleDocumentAgreementById['moduleDocumentAgreement']>
}

const ModuleDocumentAgreement = ({ moduleDocumentAgreement }: Props) => {
  const [deleteModuleDocumentAgreement] = useMutation(DELETE_MODULE_DOCUMENT_AGREEMENT_MUTATION, {
    onCompleted: () => {
      toast.success('ModuleDocumentAgreement deleted')
      navigate(routes.moduleDocumentAgreements())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteModuleDocumentAgreementMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete moduleDocumentAgreement ' + id + '?')) {
      deleteModuleDocumentAgreement({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ModuleDocumentAgreement {moduleDocumentAgreement.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{moduleDocumentAgreement.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{moduleDocumentAgreement.name}</td>
            </tr><tr>
              <th>Description</th>
              <td>{moduleDocumentAgreement.description}</td>
            </tr><tr>
              <th>Content</th>
              <td>{moduleDocumentAgreement.content}</td>
            </tr><tr>
              <th>Attachments</th>
              <td>{moduleDocumentAgreement.attachments}</td>
            </tr><tr>
              <th>Confirm</th>
              <td>{checkboxInputTag(moduleDocumentAgreement.confirm)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editModuleDocumentAgreement({ id: moduleDocumentAgreement.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(moduleDocumentAgreement.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ModuleDocumentAgreement
