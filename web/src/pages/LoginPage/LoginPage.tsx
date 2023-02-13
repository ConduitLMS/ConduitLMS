import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Row, Card, Layout, Input, Form, Button } from 'antd'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const { Content } = Layout
const WELCOME_MESSAGE = 'Welcome back!'
const REDIRECT = routes.home()

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,
    logIn,
    reauthenticate,
  } = useAuth()
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false)
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password'
  )

  // should redirect right after login or wait to show the webAuthn prompts?
  useEffect(() => {
    if (isAuthenticated && (!shouldShowWebAuthn || webAuthn.isEnabled())) {
      navigate(REDIRECT)
    }
  }, [isAuthenticated, shouldShowWebAuthn])

  // if WebAuthn is enabled, show the prompt as soon as the page loads
  useEffect(() => {
    if (!loading && !isAuthenticated && showWebAuthn) {
      onAuthenticate()
    }
  }, [loading, isAuthenticated])

  const [form] = Form.useForm()

  const onAuthenticate = async () => {
    try {
      await webAuthn.authenticate()
      await reauthenticate()
      toast.success(WELCOME_MESSAGE)
      navigate(REDIRECT)
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        toast.error(
          'Device not found, log in with Username/Password to continue'
        )
        setShowWebAuthn(false)
      } else {
        toast.error(e.message)
      }
    }
  }

  const onFinish = async (data) => {
    const webAuthnSupported = await webAuthn.isSupported()

    if (webAuthnSupported) {
      setShouldShowWebAuthn(true)
    }
    const response = await logIn({
      username: data.accountEmail,
      password: data.password,
    })

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message)
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error)
    } else {
      // user logged in
      if (webAuthnSupported) {
        setShowWebAuthn(true)
      } else {
        toast.success(WELCOME_MESSAGE)
      }
    }
  }

  const onRegister = async () => {
    try {
      await webAuthn.register()
      toast.success(WELCOME_MESSAGE)
      navigate(REDIRECT)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const onSkip = () => {
    toast.success(WELCOME_MESSAGE)
    setShouldShowWebAuthn(false)
  }

  const AuthWebAuthnPrompt = () => {
    return (
      <div className="rw-webauthn-wrapper">
        <h2>WebAuthn Login Enabled</h2>
        <p>Log in with your fingerprint, face or PIN</p>
        <div className="rw-button-group">
          <button className="rw-button rw-button-blue" onClick={onAuthenticate}>
            Open Authenticator
          </button>
        </div>
      </div>
    )
  }

  const RegisterWebAuthnPrompt = () => (
    <div className="rw-webauthn-wrapper">
      <h2>No more Passwords!</h2>
      <p>
        Depending on your device you can log in with your fingerprint, face or
        PIN next time.
      </p>
      <div className="rw-button-group">
        <button className="rw-button rw-button-blue" onClick={onRegister}>
          Turn On
        </button>
        <button className="rw-button" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </div>
  )

  const PasswordForm = () => (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Account Email"
        name="accountEmail"
        rules={[
          {
            required: true,
            message: 'Please enter the email for your account',
          },
          {
            pattern: /^[^@]+@[^.]+..+$/,
            message: 'field must be a valid email address',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter a password for your account.',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )

  const formToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return <AuthWebAuthnPrompt />
      } else {
        return <RegisterWebAuthnPrompt />
      }
    } else {
      return <PasswordForm />
    }
  }

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <div className="rw-login-link">
            <span>or login with </span>{' '}
            <a href="?type=password" className="rw-link">
              username and password
            </a>
          </div>
        )
      }
    } else {
      return (
        <div>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <p>
              Don&apos;t have an account?{' '}
              <span style={{ color: 'blue' }}>
                <Link to={routes.signup()}>Sign up!</Link>
              </span>
            </p>
          </div>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <p>
              Trouble Logging in?{' '}
              <span style={{ color: 'blue' }}>
                <Link to={routes.forgotPassword()}>Forgot Password.</Link>
              </span>
            </p>
          </div>
        </div>
      )
    }
  }

  if (loading) {
    return null
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <>
      <>
        <MetaTags title="Login" description="Login page" />
        <Layout style={{ height: '100vh' }}>
          <Content>
            <Row
              justify="space-around"
              align="middle"
              style={{ height: '100vh' }}
            >
              <Col>
                <Card
                  title="Login"
                  style={{
                    width: 500,
                    textAlign: 'center',
                  }}
                  bordered={false}
                >
                  <div>
                    <div>{formToRender()}</div>
                  </div>

                  {linkToRender()}

                  <Toaster />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    </>
  )
}

export default LoginPage
