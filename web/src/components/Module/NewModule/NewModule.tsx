import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ModuleForm from 'src/components/Module/ModuleForm'

import type { CreateModuleInput } from 'types/graphql'

const CREATE_MODULE_MUTATION = gql`
  mutation CreateModuleMutation($input: CreateModuleInput!) {
    createModule(input: $input) {
      id
    }
  }
`

const NewModule = () => {
  const [createModule, { loading, error }] = useMutation(
    CREATE_MODULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Module created')
        navigate(routes.modules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateModuleInput) => {
    createModule({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Module</h2>
      </header>
      <div className="rw-segment-main">
        <ModuleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewModule
