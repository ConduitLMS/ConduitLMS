import ModuleCell from 'src/components/Module/ModuleCell'

type ModulePageProps = {
  id: number
}

const ModulePage = ({ id }: ModulePageProps) => {
  return <ModuleCell id={id} />
}

export default ModulePage
