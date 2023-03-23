import React, { FC } from 'react'

import { Col, Row, Typography, Radio, Form, Button } from 'antd'
import type { RadioChangeEvent } from 'antd'

const { Paragraph, Title } = Typography

interface TitleProps {
  title: string
  questions: object
}

const RenderQuiz: FC<TitleProps> = ({ title, questions }) => {
  const [form] = Form.useForm()

  const onChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`)
  }

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <>
      <Row>
        <Title>{title}</Title>
      </Row>
      <Form form={form} onFinish={onFinish} style={{ maxWidth: 600 }}>
        {Object.keys(questions).map((key, i) => {
          return (
            <Row key={i}>
              <Col span={24}>
                <Paragraph>{questions[key].text}</Paragraph>
              </Col>
              <Form.Item name={i}>
                <Radio.Group onChange={onChange} defaultValue="a">
                  {questions[key].answers.map(function (item, i) {
                    return (
                      <Row key={i}>
                        <Radio value={i}>{item}</Radio>
                      </Row>
                    )
                  })}
                </Radio.Group>
              </Form.Item>
            </Row>
          )
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default RenderQuiz
