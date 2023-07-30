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

const Table: FC<TitleProps> = ({}) => {
  type UserItem = {
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

  const columns: ProColumns<UserItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'First Name',
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
      title: 'Last Name',
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
      title: 'Departments',
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
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
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

  const testData = [
    {
      id: 1,
      title: 'title1',
      state: 'open',
      labels: [
        {
          name: 'label1',
          color: 'red',
        },
      ],
      created_at: '2021-01-01',
    },
    {
      id: 2,
      title: 'title2',
      state: 'closed',
      labels: [
        {
          name: 'label2',
          color: 'blue',
        },
      ],
      created_at: '2021-01-02',
    },
  ]

  return (
    <>
      <ConfigProvider locale={en_US}>
        <MetaTags title="Courses" description="Courses page" />

        <ProTable<GithubIssueItem>
          columns={columns}
          cardBordered
          request={async (params = {}, sort, filter) => {
            console.log(sort, filter)
            return request<{
              data: GithubIssueItem[]
            }>(testData, {
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
          headerTitle="Users"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              Invite User
            </Button>,
          ]}
        />
      </ConfigProvider>
    </>
  )
}

export default Table
