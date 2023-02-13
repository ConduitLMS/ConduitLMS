import EditAssignmentCell from 'src/components/Assignment/EditAssignmentCell'

type AssignmentPageProps = {
  id: number
}

const EditAssignmentPage = ({ id }: AssignmentPageProps) => {
  return <EditAssignmentCell id={id} />
}

export default EditAssignmentPage
