import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Row, Card, Layout, Divider, Tooltip } from 'antd'
import { Button, Checkbox, Form, Input, ColorPicker } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import {
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const { Content } = Layout

const CREATE_ORGANIZATION = gql`
  mutation CreateOrganizationMutation($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
    }
  }
`

const SignupPage = () => {
  // focus on username box on page load
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const [form] = Form.useForm()

  const [createOrg, { data, loading, error }] = useMutation<
    CreateOrganizationMutation,
    CreateOrganizationMutationVariables
  >(CREATE_ORGANIZATION, {
    onCompleted: () => {
      callCreateUser(form.getFieldsValue(), data.createOrganization.id)
      form.resetFields()
    },
  })

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const callCreateUser = async (data: Record<string, string>, variableTest) => {
    const response = await signUp({
      username: data.accountEmail,
      password: data.password,
      organizationId: variableTest,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  const onFinish = async (data: Record<string, string>) => {
    createOrg({
      variables: {
        input: {
          name: data.organizationName,
          contactEmail: data.contactEmail,
          address: data.address,
          //Todo: Hookup a bucket storage for logos
          logo: fileList[0].url,
        },
      },
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <MetaTags title="Signup" description="Signup page" />
      <Layout style={{ height: '100vh' }}>
        <Content>
          <Row
            justify="space-around"
            align="middle"
            style={{ height: '100vh' }}
          >
            <Col>
              <Card
                title="New Organization Registration"
                style={{
                  width: 500,
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <Toaster />
                <Divider plain>Organization</Divider>
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
                  <div
                    style={{
                      padding: 20,
                      //#Todo: Properly center this component
                    }}
                  ></div>
                  <Tooltip title="The desired name of your organization. Does not have to be unique and can be changed later.">
                    <Form.Item
                      label="Organization Name"
                      name="organizationName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your organization name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Tooltip>

                  <Tooltip title="Your Organization logo.">
                    <Form.Item
                      label="Organization Logo"
                      name="orgLogo"
                      rules={[
                        {
                          required: false,
                          message:
                            'Please input the URL for the logo you wish to use for your organization!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Tooltip>

                  <Tooltip>
                    <Form.Item label="Primary Colour" name="primaryColour">
                      <ColorPicker
                        showText={(color) => (
                          <span>Primary Colour ({color.toHexString()})</span>
                        )}
                      />
                    </Form.Item>
                  </Tooltip>

                  <Tooltip>
                    <Form.Item
                      label="Background Colour"
                      name="backgroundColour"
                    >
                      <ColorPicker
                        showText={(color) => (
                          <span>Background Colour ({color.toHexString()})</span>
                        )}
                      />
                    </Form.Item>
                  </Tooltip>

                  <Divider plain>Admin Account</Divider>
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

                  <Form.Item
                    name="terms & conditions"
                    valuePropName="checked"
                    wrapperCol={{ offset: 4, span: 16 }}
                    rules={[
                      {
                        required: true,
                        message: "Please accept Conduit's terms & conditions.",
                      },
                    ]}
                  >
                    <Checkbox>I Accept the Terms & Conditions.</Checkbox>
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
                    <span style={{ color: 'blue' }}></span>
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default SignupPage
