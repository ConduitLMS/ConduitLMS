import React, { FC } from 'react'
import { useRef } from 'react'

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown, Space, Tag } from 'antd'
import { ConfigProvider } from 'antd'
import en_US from 'antd/lib/locale/en_US'
import request from 'umi-request'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ModuleDocumentAgreementsCell from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreementsCell/ModuleDocumentAgreementsCell'

type GithubIssueItem = {
  url: string
  id: number
  number: number
  title: string
  labels: {
    name: string
    color: string
  }[]
  state: string
  comments: number
  created_at: string
  updated_at: string
  closed_at?: string
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'title',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: 'If the title is too long, it will automatically shrink',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This is required',
        },
      ],
    },
  },
  {
    disable: true,
    title: 'state',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: 'super long'.repeat(50) },
      open: {
        text: 'unsolved',
        status: 'Error',
      },
      closed: {
        text: 'solved',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: 'solving',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: 'label',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_)
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'creation time',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'created at',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        }
      },
    },
  },
  {
    title: 'operate',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        edit
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        Check
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: 'copy' },
          { key: 'delete', name: 'delete' },
        ]}
      />,
    ],
  },
]

interface TitleProps {
  title: string
}

const Title: FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <ConfigProvider locale={en_US}>
        <MetaTags title="Courses" description="Courses page" />

        <h1>CoursesPage</h1>
        <ModuleDocumentAgreementsCell />
        <p>
          My default route is named <code>courses</code>, link to me with `
          <Link to={routes.courses()}>Courses</Link>`
        </p>
        <ProTable<GithubIssueItem>
          columns={columns}
          cardBordered
          request={async (params = {}, sort, filter) => {
            console.log(sort, filter)
            return request<{
              data: GithubIssueItem[]
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            })
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value)
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                }
              }
              return values
            },
          }}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="advanced form"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              new build
            </Button>,
            <Dropdown
              key="menu"
              menu={{
                items: [
                  {
                    label: '1st item',
                    key: '1',
                  },
                  {
                    label: '2nd item',
                    key: '1',
                  },
                  {
                    label: '3rd item',
                    key: '1',
                  },
                ],
              }}
            >
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>,
          ]}
        />
      </ConfigProvider>
    </>
  )
}

export default Title
