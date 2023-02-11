import AssignmentCell from 'src/components/Assignment/AssignmentCell'

type AssignmentPageProps = {
  id: number
}

const AssignmentPage = ({ id }: AssignmentPageProps) => {
  return <AssignmentCell id={id} />
}

export default AssignmentPage
