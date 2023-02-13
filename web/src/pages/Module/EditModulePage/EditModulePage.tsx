import EditModuleCell from 'src/components/Module/EditModuleCell'

type ModulePageProps = {
  id: number
}

const EditModulePage = ({ id }: ModulePageProps) => {
  return <EditModuleCell id={id} />
}

export default EditModulePage
