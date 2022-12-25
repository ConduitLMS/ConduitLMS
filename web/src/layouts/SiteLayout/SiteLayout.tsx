import React, { useState } from 'react'

import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BankOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import {
  Menu,
  Layout,
  Breadcrumb,
  theme,
  Avatar,
  Dropdown,
  Space,
  Badge,
} from 'antd'

const { Header, Sider, Content } = Layout

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

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <div className="logo" />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          height: '100vh',
        }}
      >
        <div className="logo" />
        <Menu
          defaultOpenKeys={['sub1']}
          style={{ maxWidth: 256, background: colorBgContainer }}
          defaultSelectedKeys={['1']}
          items={[
            getItem(
              <Link to={routes.home()}>Home</Link>,
              'sub1',
              <HomeOutlined />
            ),

            getItem(
              <Link to={routes.marketplace()}>Marketplace</Link>,
              'sub4',
              <BankOutlined />
            ),
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
            style={{
              padding: 0,
              background: colorBgContainer,
              paddingLeft: 5,
              marginLeft: 'auto',
            }}
            onClick={onClick}
            mode="horizontal"
            items={[
              getItem(
                '',
                '',
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Profile</Menu.Item>
                      <Menu.Item key="2">Settings</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="3">Logout</Menu.Item>
                    </Menu>
                  }
                >
                  <span className="avatar-item">
                    <Badge count={99}>
                      <Avatar shape="square" icon={<UserOutlined />} />
                    </Badge>
                    <span
                      style={{
                        paddingLeft: 15,
                      }}
                    >
                      <p>fName lName</p>
                    </span>
                  </span>
                </Dropdown>
              ),
            ]}
          >
            <Menu.Item key="app">
              <Avatar
                size={24}
                style={{ verticalAlign: 'middle' }}
                icon={<UserOutlined />}
              />
            </Menu.Item>
          </Menu>
        </Header>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
