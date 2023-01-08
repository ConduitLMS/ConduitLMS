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

import Title from 'src/components/AdvancedTable/AdvancedTables'
import ModuleDocumentAgreementsCell from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreementsCell/ModuleDocumentAgreementsCell'

const CoursesPage = () => {
  return (
    <>
      <h1>HELLLLLO</h1>
      <Title title={'cat'} subtitle={'dog'} />
    </>
  )
}

export default CoursesPage
