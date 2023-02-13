import { useEffect, useState } from 'react'

import {
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
  AlertOutlined,
} from '@ant-design/icons'
import {
  Calendar,
  theme,
  Col,
  Row,
  Statistic,
  Card,
  Progress,
  Typography,
  Modal,
  Tooltip,
} from 'antd'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
import Title from 'antd/es/typography/Title'
import type { Dayjs } from 'dayjs'
import Moment from 'moment'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AssignmentsCell from 'src/components/Assignment/AssignmentsCell'
import UserCell from 'src/components/UserCell/UserCell'
import userSessionAtom from 'src/recoil/atoms/userSession'
import assignmentsSessionAtom from 'src/recoil/atoms/userSession'

const { Paragraph, Text } = Typography

const HomePage = () => {
  const [userSession, setUserSession] = useRecoilState(userSessionAtom)
  const [assignmentsSession, setAssignmentSession] = useRecoilState(
    assignmentsSessionAtom
  )
  const [modalOpen, setModalOpen] = useState(false)

  const { currentUser } = useAuth()

  const { token } = theme.useToken()
  const formatter = (value: number) => <CountUp end={value} separator="," />
  Moment.locale('en')

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    padding: 35,
  }

  const { t, i18n } = useTranslation()

  const userQueryRes = UserCell(currentUser).props.user
  const assignmentsQueryRes = AssignmentsCell(currentUser).props.assignments

  useEffect(() => {
    setUserSession(userQueryRes)
  })

  //console.log(assignmentsQueryRes.filter((element) => element.progress < 100))
  console.log(Moment(Date.now()).format('YYYY-MM-DD'))
  console.log(Moment('1970-01-01T00:00:00.000Z').format('YYYY-MM-DD'))

  return (
    <>
      <Modal
        title="To Be Implemented...."
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>Placeholder Text...</p>
      </Modal>
      <MetaTags title="Home" description="Home page" />
      <Card style={{ height: '10%' }}>
        <Row gutter={16} style={{ padding: 15, height: '100%' }}>
          <Col sm={6} md={6} lg={6} xl={6}>
            <Tooltip title={t('Home.Stat1Tooltip')}>
              <Card bordered={false}>
                <Statistic
                  title={t('Home.Stat1')}
                  value={
                    assignmentsQueryRes
                      ? (assignmentsQueryRes.filter(
                          (element) => element.progress < 100
                        ).length /
                          assignmentsQueryRes.length) *
                        100
                      : 0
                  }
                  precision={2}
                  valueStyle={{ color: token.colorInfo }}
                  prefix={<BookOutlined />}
                  suffix="%"
                  formatter={formatter}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col sm={6} md={6} lg={6} xl={6}>
            <Tooltip title={t('Home.Stat2Tooltip')}>
              <Card bordered={false}>
                <Statistic
                  title={t('Home.Stat2')}
                  value={9}
                  precision={2}
                  valueStyle={{ color: token.colorInfo }}
                  prefix={<ClockCircleOutlined />}
                  formatter={formatter}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col sm={6} md={6} lg={6} xl={6}>
            <Tooltip title={t('Home.Stat3Tooltip')}>
              <Card bordered={false}>
                <Statistic
                  title={t('Home.Stat3')}
                  value={
                    assignmentsQueryRes
                      ? assignmentsQueryRes.filter(
                          (element) =>
                            Moment(element.dueDate).format('YYYYMMDD') <
                              Moment(Date.now()).format('YYYYMMDD') &&
                            element.progress < 100
                        ).length
                      : 10
                  }
                  precision={2}
                  valueStyle={{ color: token.colorError }}
                  prefix={<AlertOutlined />}
                  formatter={formatter}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col sm={6} md={6} lg={6} xl={6}>
            <Tooltip title={t('Home.Stat4Tooltip')}>
              <Card bordered={false}>
                <Statistic
                  title={t('Home.Stat4')}
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: token.colorSuccess }}
                  prefix={<TrophyOutlined />}
                  formatter={formatter}
                />
              </Card>
            </Tooltip>
          </Col>
        </Row>
        <Row>
          <Col span={16} style={{ padding: 15, height: '70vh' }}>
            <Card style={{ height: '100%', padding: 15 }}>
              <Title level={3} style={{ marginTop: -10 }}>
                {t('Home.dashboardTitle')}
              </Title>
              <div
                style={{
                  maxHeight: '85%',
                  overflowY: 'auto',
                  position: 'absolute',
                  width: '90%',
                  padding: 5,
                }}
              >
                {assignmentsQueryRes ? (
                  assignmentsQueryRes.map((assignment) => (
                    <Card
                      style={{ padding: 0, margin: 5 }}
                      key={assignment.id}
                      onClick={() => setModalOpen(true)}
                    >
                      <Row>
                        <Col span={18}>
                          <Text strong>{assignment.module.name}</Text>
                        </Col>
                        <Col span={6}>
                          <Text type="secondary">
                            Due:{' '}
                            {Moment(assignment.dueDate).format(
                              'd MMM YYYY @ HH:MM'
                            )}
                          </Text>
                        </Col>
                      </Row>
                      <Text
                        type="secondary"
                        key={assignment.id}
                        style={{ paddingLeft: 15 }}
                      >
                        {assignment.module.description}
                      </Text>
                      <Progress
                        percent={assignment.progress}
                        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                      />
                    </Card>
                  ))
                ) : (
                  <p>Loading Assignments</p>
                )}
              </div>
            </Card>
          </Col>
          <Col span={8} style={{ paddingTop: 15 }}>
            <div style={wrapperStyle}>
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
            <Card style={{ marginTop: 15, height: '40%' }}></Card>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default HomePage
