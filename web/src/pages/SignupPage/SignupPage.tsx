import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Row, Card, Layout, Divider, Tooltip } from 'antd'
import { Button, Checkbox, Form, Input, ColorPicker } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import axios from 'axios'
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
    const createOrgOptions = {
      method: 'POST',
      url: 'https://conduitlms-dev.us.auth0.com/api/v2/organizations',
      headers: {
        'content-type': 'application/json',
        authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJRTm9pbXdEU0RVOUZzWjNPM2FhZSJ9.eyJpc3MiOiJodHRwczovL2NvbmR1aXRsbXMtZGV2LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJGeHFBZHZCMTliOW5BOUN2cmpueU5IREw4ekNmVjJUT0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jb25kdWl0bG1zLWRldi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5MDc0MDI5MywiZXhwIjoxNjkzMzMyMjkzLCJhenAiOiJGeHFBZHZCMTliOW5BOUN2cmpueU5IREw4ekNmVjJUTyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.hLv2wlTRcvcJOWk6xXM1UyBFfLdQuDZuQBip_BmuOcj69pssFDDCY2vZZJTZQnliIUXYOAofIIgR7sUmz8MEeZyfgNOLEkn2eWuV17gR8HTushQIc37uOIde9m5Nkmmel28sP7Z68ALWXe7L2-AIhYpjfbS68dwa7dQdhLJ3J7wc5NCnj8T79GP8g_qQW7R9MOyVurJTPghJWPCTc35EooVA2sqVu8Ny-BjVjfXiaQWCozHwDaZR4iUk7cGgdR1I6WTA_M0v1V43TFC4G8nQ6OnARRyTOXLOI1lrhh09OcosiuaaNfPyMc-SorTUSbhsGRclIWthBK50w5PsNTa4Rw',
        'cache-control': 'no-cache',
      },
      data: data,
    }

    const createOrgData = {
      display_name: data.organizationName,
      name: data.organizationName.toLowerCase().replace(/\s/g, ''),
    }
    console.log(data)
    console.log(createOrgData)

    axios
      .request(createOrgOptions)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
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
