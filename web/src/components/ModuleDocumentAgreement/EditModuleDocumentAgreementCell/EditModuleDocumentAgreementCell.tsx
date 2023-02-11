import type { EditModuleDocumentAgreementById, UpdateModuleDocumentAgreementInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ModuleDocumentAgreementForm from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreementForm'

export const QUERY = gql`
  query EditModuleDocumentAgreementById($id: Int!) {
    moduleDocumentAgreement: moduleDocumentAgreement(id: $id) {
      id
      name
      description
      content
      attachments
      confirm
    }
  }
`
const UPDATE_MODULE_DOCUMENT_AGREEMENT_MUTATION = gql`
  mutation UpdateModuleDocumentAgreementMutation($id: Int!, $input: UpdateModuleDocumentAgreementInput!) {
    updateModuleDocumentAgreement(id: $id, input: $input) {
      id
      name
      description
      content
      attachments
      confirm
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ moduleDocumentAgreement }: CellSuccessProps<EditModuleDocumentAgreementById>) => {
  const [updateModuleDocumentAgreement, { loading, error }] = useMutation(
    UPDATE_MODULE_DOCUMENT_AGREEMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('ModuleDocumentAgreement updated')
        navigate(routes.moduleDocumentAgreements())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateModuleDocumentAgreementInput,
    id: EditModuleDocumentAgreementById['moduleDocumentAgreement']['id']
  ) => {
    updateModuleDocumentAgreement({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit ModuleDocumentAgreement {moduleDocumentAgreement?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ModuleDocumentAgreementForm moduleDocumentAgreement={moduleDocumentAgreement} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
