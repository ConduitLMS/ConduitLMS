import type { FindModuleDocumentAgreementById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ModuleDocumentAgreement from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreement'

export const QUERY = gql`
  query FindModuleDocumentAgreementById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ModuleDocumentAgreement not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ moduleDocumentAgreement }: CellSuccessProps<FindModuleDocumentAgreementById>) => {
  return <ModuleDocumentAgreement moduleDocumentAgreement={moduleDocumentAgreement} />
}
