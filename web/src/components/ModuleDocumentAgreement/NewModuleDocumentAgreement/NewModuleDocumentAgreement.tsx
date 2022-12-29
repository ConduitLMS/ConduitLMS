import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ModuleDocumentAgreementForm from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreementForm'

import type { CreateModuleDocumentAgreementInput } from 'types/graphql'

const CREATE_MODULE_DOCUMENT_AGREEMENT_MUTATION = gql`
  mutation CreateModuleDocumentAgreementMutation($input: CreateModuleDocumentAgreementInput!) {
    createModuleDocumentAgreement(input: $input) {
      id
    }
  }
`

const NewModuleDocumentAgreement = () => {
  const [createModuleDocumentAgreement, { loading, error }] = useMutation(
    CREATE_MODULE_DOCUMENT_AGREEMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('ModuleDocumentAgreement created')
        navigate(routes.moduleDocumentAgreements())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateModuleDocumentAgreementInput) => {
    createModuleDocumentAgreement({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ModuleDocumentAgreement</h2>
      </header>
      <div className="rw-segment-main">
        <ModuleDocumentAgreementForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewModuleDocumentAgreement
