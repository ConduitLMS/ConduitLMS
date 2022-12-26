import React, { useState } from 'react'

import { Upload } from 'antd'
import { Col, Row, Card, Layout } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const { Content } = Layout

import {
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables,
} from 'types/graphql'

const CREATE_ORGANIZATION = gql`
  mutation CreateOrganizationMutation($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
    }
  }
`

const SignupPage = () => {
  const [form] = Form.useForm()

  const [create, { loading, error }] = useMutation<
    CreateOrganizationMutation,
    CreateOrganizationMutationVariables
  >(CREATE_ORGANIZATION, {
    onCompleted: () => {
      toast.success('Organization created')
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

  const onFinish = (values: any) => {
    console.log('Success:', values)
    create({
      variables: {
        input: {
          name: values.organizationName,
          address: values.address,
          contactEmail: values.contactEmail,
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
                title="Organization Registration"
                style={{
                  width: 500,
                }}
                bordered={false}
              >
                <Toaster />
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
                    style={
                      {
                        //#Todo: Properly center this component
                      }
                    }
                  >
                    <ImgCrop rotate>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                      >
                        {fileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </div>
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

                  <Form.Item
                    label="Contact Email"
                    name="contactEmail"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter an email we can contact you at.',
                      },
                      {
                        pattern: /^[^@]+@[^.]+..+$/,
                        message: 'field must be a valid email address',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="terms & conditions"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                    rules={[
                      {
                        required: true,
                        message: "Please accept Conduit's terms & conditions.",
                      },
                    ]}
                  >
                    <Checkbox>I Accept the Terms & Conditions.</Checkbox>
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default SignupPage
