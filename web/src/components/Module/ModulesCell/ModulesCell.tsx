import type { FindModules } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Modules from 'src/components/Module/Modules'

export const QUERY = gql`
  query FindModules {
    modules {
      id
      name
      description
      moduleType
      questionJson
      answerKey
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No modules yet. '}
      <Link
        to={routes.newModule()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ modules }: CellSuccessProps<FindModules>) => {
  return <Modules modules={modules} />
}
