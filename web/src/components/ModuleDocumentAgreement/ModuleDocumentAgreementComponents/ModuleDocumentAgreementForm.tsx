import React, { FC } from 'react'

import { Button, Form, Input, Select } from 'antd'
import type { FormInstance } from 'antd/es/form'

interface ModuleDocumentAgreementProps {
  title: string
}

const ModuleDocumentAgreementForm: FC<ModuleDocumentAgreementProps> = ({
  title,
}) => {
  const [form] = Form.useForm()

  const onFinish = async (data) => {
    console.log(data)
  }

  const onFinishFailed = async (data) => {
    console.log(data)
  }

  return (
    <>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      ></Form>
    </>
  )
}

export default ModuleDocumentAgreementForm
