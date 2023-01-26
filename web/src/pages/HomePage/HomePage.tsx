import { useEffect } from 'react'

import {
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
  AlertOutlined,
} from '@ant-design/icons'
import { Calendar, theme, Col, Row, Statistic, Card } from 'antd'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
import Title from 'antd/es/typography/Title'
import type { Dayjs } from 'dayjs'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import UserCell from 'src/components/UserCell/UserCell'
import userSessionAtom from 'src/recoil/atoms/userSession'

const HomePage = () => {
  const [userSession, setUserSession] = useRecoilState(userSessionAtom)
  const { currentUser } = useAuth()

  const { token } = theme.useToken()
  const formatter = (value: number) => <CountUp end={value} separator="," />

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

  useEffect(() => {
    setUserSession(userQueryRes)
  })

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Row gutter={16} style={{ padding: 15, height: '100%' }}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title={t('Home.Stat1')}
              value={11.28}
              precision={2}
              valueStyle={{ color: token.colorInfo }}
              prefix={<BookOutlined />}
              suffix="%"
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
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
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title={t('Home.Stat3')}
              value={9.3}
              precision={2}
              valueStyle={{ color: token.colorError }}
              prefix={<AlertOutlined />}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
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
        </Col>
      </Row>
      <Row>
        <Col span={16} style={{ padding: 15 }}>
          <Card style={{ height: '100%', padding: 15 }}>
            <Title level={3}>{t('Home.dashboardTitle')}</Title>
          </Card>
        </Col>
        <Col span={8} style={{ paddingTop: 15 }}>
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
          <Card style={{ marginTop: 15 }}></Card>
        </Col>
      </Row>
    </>
  )
}

export default HomePage
