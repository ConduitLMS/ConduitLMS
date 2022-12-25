import React, { useState } from 'react'

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Layout, Button, theme } from 'antd'

const { Header, Footer, Sider, Content } = Layout

import { Link, routes } from '@redwoodjs/router'

type SiteLayoutProps = {
  children?: React.ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const topbarItems: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
]

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
        }}
      >
        <div className="logo" />
        <Menu
          defaultOpenKeys={['sub1']}
          style={{ maxWidth: 256, background: colorBgContainer }}
          defaultSelectedKeys={['1']}
          items={[
            getItem('Navigation One', 'sub1', <MailOutlined />, [
              getItem('Option 1', '1'),
              getItem('Option 2', '2'),
              getItem('Option 3', '3'),
              getItem('Option 4', '4'),
            ]),

            getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
              getItem('Option 5', '5'),
              getItem('Option 6', '6'),
              getItem('Submenu', 'sub3', null, [
                getItem('Option 7', '7'),
                getItem('Option 8', '8'),
              ]),
            ]),

            getItem('Navigation Three', 'sub4', <SettingOutlined />, [
              getItem('Option 9', '9'),
              getItem('Option 10', '10'),
              getItem('Option 11', '11'),
              getItem('Option 12', '12'),
            ]),
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            paddingLeft: 5,
            display: 'flex',
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Menu
            style={{ padding: 0, background: colorBgContainer, paddingLeft: 5 }}
            onClick={onClick}
            mode="horizontal"
            items={topbarItems}
          />
        </Header>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <main>{children}</main>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default SiteLayout
