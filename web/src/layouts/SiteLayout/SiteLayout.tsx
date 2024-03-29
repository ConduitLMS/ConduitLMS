import React, { useState } from 'react'

import {
  BankOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Badge, Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd'
import { useTranslation } from 'react-i18next'

const { Header, Sider, Content } = Layout

import { useRecoilValue } from 'recoil'

import { Link, Redirect, routes, useLocation } from '@redwoodjs/router'

import userSessionAtom from 'src/recoil/atoms/userSession'

type SiteLayoutProps = {
  childreni?: React.ReactNode
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
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)

  const userState = useRecoilValue(userSessionAtom)

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  const LogOut = () => {
    logOut()
    ;<Redirect to={routes.home()} />
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const { t, i18n } = useTranslation()

  return (
    <Layout style={{ maxHeight: '100%' }}>
      <div className="logo" />
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
          style={{ maxWidth: 236, background: colorBgContainer }}
          defaultSelectedKeys={['home']}
          mode="inline"
          items={[
            getItem(
              <Link to={routes.home()}>{t('navigationItems.Home')}</Link>,
              'home',
              <HomeOutlined />
            ),

            getItem(
              <Link to={routes.marketplace()}>
                {t('navigationItems.Marketplace')}
              </Link>,
              'marketplace',
              <BankOutlined />
            ),

            getItem(
              <Link to={routes.courses()}>{t('navigationItems.Courses')}</Link>,
              'courses',
              <BookOutlined />
            ),
            getItem(
              <Link to={routes.testing()}>{t('navigationItems.Testing')}</Link>,
              'testing',
              <BookOutlined />
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
                      <Menu.Item key="1">
                        {t('navigationItems.Profile')}
                      </Menu.Item>
                      <Menu.Item key="2">
                        {t('navigationItems.Settings')}
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="3" onClick={LogOut}>
                        {t('navigationItems.Logout')}
                      </Menu.Item>
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
                      {userState ? (
                        <p>{userState.firstName + ' ' + userState.lastName}</p>
                      ) : (
                        <p>User</p>
                      )}
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
