import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreementsCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

import type { DeleteModuleDocumentAgreementMutationVariables, FindModuleDocumentAgreements } from 'types/graphql'

const DELETE_MODULE_DOCUMENT_AGREEMENT_MUTATION = gql`
  mutation DeleteModuleDocumentAgreementMutation($id: Int!) {
    deleteModuleDocumentAgreement(id: $id) {
      id
    }
  }
`

const ModuleDocumentAgreementsList = ({ moduleDocumentAgreements }: FindModuleDocumentAgreements) => {
  const [deleteModuleDocumentAgreement] = useMutation(DELETE_MODULE_DOCUMENT_AGREEMENT_MUTATION, {
    onCompleted: () => {
      toast.success('ModuleDocumentAgreement deleted')
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

  const onDeleteClick = (id: DeleteModuleDocumentAgreementMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete moduleDocumentAgreement ' + id + '?')) {
      deleteModuleDocumentAgreement({ variables: { id } })
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
            <th>Content</th>
            <th>Attachments</th>
            <th>Confirm</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {moduleDocumentAgreements.map((moduleDocumentAgreement) => (
            <tr key={moduleDocumentAgreement.id}>
              <td>{truncate(moduleDocumentAgreement.id)}</td>
              <td>{truncate(moduleDocumentAgreement.name)}</td>
              <td>{truncate(moduleDocumentAgreement.description)}</td>
              <td>{truncate(moduleDocumentAgreement.content)}</td>
              <td>{truncate(moduleDocumentAgreement.attachments)}</td>
              <td>{checkboxInputTag(moduleDocumentAgreement.confirm)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.moduleDocumentAgreement({ id: moduleDocumentAgreement.id })}
                    title={'Show moduleDocumentAgreement ' + moduleDocumentAgreement.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editModuleDocumentAgreement({ id: moduleDocumentAgreement.id })}
                    title={'Edit moduleDocumentAgreement ' + moduleDocumentAgreement.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete moduleDocumentAgreement ' + moduleDocumentAgreement.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(moduleDocumentAgreement.id)}
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

export default ModuleDocumentAgreementsList
