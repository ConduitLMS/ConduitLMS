import type { EditModuleById, UpdateModuleInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ModuleForm from 'src/components/Module/ModuleForm'

export const QUERY = gql`
  query EditModuleById($id: Int!) {
    module: module(id: $id) {
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
const UPDATE_MODULE_MUTATION = gql`
  mutation UpdateModuleMutation($id: Int!, $input: UpdateModuleInput!) {
    updateModule(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ module }: CellSuccessProps<EditModuleById>) => {
  const [updateModule, { loading, error }] = useMutation(
    UPDATE_MODULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Module updated')
        navigate(routes.modules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateModuleInput,
    id: EditModuleById['module']['id']
  ) => {
    updateModule({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Module {module?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ModuleForm module={module} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
