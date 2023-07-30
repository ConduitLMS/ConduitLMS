import { useEffect, useRef } from 'react'

import {
  Col,
  Row,
  Card,
  Layout,
  Divider,
  Tooltip,
  Button,
  Form,
  Input,
} from 'antd'

import { useAuth } from '@redwoodjs/auth'
import { Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes, Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const { Content } = Layout

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const [form] = Form.useForm()

  const onSubmit = async (data: { username: string }) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (<>
    <MetaTags title="Forgot Password" />
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Row
          justify="space-around"
          align="middle"
          style={{ height: '100vh' }}
        >
          <Col>
            <Card
              title="Forgot Password"
              style={{
                width: 500,
                textAlign: 'center',
              }}
              bordered={false}
            >
              <Toaster
                toastOptions={{ className: 'rw-toast', duration: 6000 }}
              />
              <Form
                name="basic"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                //onFinishFailed={}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter an email to send reset link to.',
                    },
                    {
                      pattern: /^[^@]+@[^.]+..+$/,
                      message: 'field must be a valid email address',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>

              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <p>
                  Already have an account{' '}
                  <span style={{ color: 'blue' }}>
                    <Link to={routes.login()}>LogIn.</Link>
                  </span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  </>);
}

export default ForgotPasswordPage
