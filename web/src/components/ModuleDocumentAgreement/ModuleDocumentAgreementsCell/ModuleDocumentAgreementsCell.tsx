import type { FindModuleDocumentAgreements } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ModuleDocumentAgreements from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreements'

export const QUERY = gql`
  query FindModuleDocumentAgreements {
    documents: moduleDocumentAgreements {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No moduleDocumentAgreements yet. '}
      <Link to={routes.newModuleDocumentAgreement()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  documents,
}: CellSuccessProps<FindModuleDocumentAgreements>) => {
  return (
    <ul>
      {documents.map((document) => {
        return <li key={document.id}>{JSON.stringify(document)}</li>
      })}
    </ul>
  )
}
