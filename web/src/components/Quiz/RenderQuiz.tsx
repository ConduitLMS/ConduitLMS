import React, { FC } from 'react'

import { Col, Row, Typography, Radio, Form, Button, message } from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { UpdateAssignmentInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const { Paragraph, Title } = Typography

const UPDATE_ASSIGNMENT_MUTATION = gql`
  mutation UpdateAssignmentMutation($id: Int!, $input: UpdateAssignmentInput!) {
    updateAssignment(id: $id, input: $input) {
      id
      name
      description
      userId
      organizationId
      assignedDate
      dueDate
      userAnswers
    }
  }
`

interface TitleProps {
  title: string
  questions: object
  id: number
}

const RenderQuiz: FC<TitleProps> = ({ title, questions, id }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const delay = (ms) => new Promise((res) => setTimeout(res, ms))
  const [updateAssignment, { loading, error }] = useMutation(
    UPDATE_ASSIGNMENT_MUTATION,
    {
      onCompleted: async () => {
        messageApi.open({
          type: 'success',
          content: "You're answers have been submitted!",
        })
        await delay(1000)
        window.location.reload()
      },
      onError: (error) => {
        messageApi.open({
          type: 'error',
          content: 'There has been an error, ' + error.message,
        })
      },
    }
  )

  const onChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`)
  }

  const onFinish = (values: any) => {
    const input = {
      userAnswers: values,
    }
    updateAssignment({ variables: { id, input } })
  }

  return (
    <>
      {contextHolder}
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
