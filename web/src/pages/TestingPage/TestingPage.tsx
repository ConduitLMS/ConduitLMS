import { useRecoilState } from 'recoil'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AssignmentsCell from 'src/components/Assignment/AssignmentsCell'
import RenderQuiz from 'src/components/Quiz/RenderQuiz'
import assignmentsSessionAtom from 'src/recoil/atoms/userSession'

const TestingPage = () => {
  const [assignmentsSession, setAssignmentSession] = useRecoilState(
    assignmentsSessionAtom
  )
  const { currentUser } = useAuth()

  const assignmentsQueryRes = AssignmentsCell(currentUser).props.assignments

  console.log(assignmentsQueryRes)

  return (
    <>
      <MetaTags title="Testing" description="Testing page" />
    </>
  )
}

export default TestingPage
