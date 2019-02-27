import React from 'react'
import history from '../components/history'
import { Icon, Layout, Menu } from 'antd'
const { Sider } = Layout
const { SubMenu } = Menu

class Board extends React.Component {
  constructor () {
    super()
    this.state = { condi: '3' }
  }
  logout () {
    localStorage.removeItem('jwtToken')
    window.location.reload()
  }
  render () {
    const { width, collapsed, onCollapse } = this.props
    if (this.state.condi === '2') {
      return (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          collapsedWidth={width < 768 ? 0 : undefined}
          width={200}
          style={{ paddingTop: '20px' }}
          trigger={null}
        >
          {width > 768 && (
            <div
              style={{
                color: '#fff',
                width: '100%',
                paddingLeft: !collapsed && '24px',
                textAlign: collapsed && 'center',
                paddingBottom: '44px'
              }}
            >
              <Icon
                style={{ marginRight: !collapsed && '10px' }}
                type='file-text'
                theme='filled'
              />
              {!collapsed && <span>eSkill Test</span>}
            </div>
          )}
          <Menu
            mode='inline'
            theme='dark'
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            style={{ height: '100%', borderRight: 0, paddingBottom: '100px' }}
          >
            <Menu.Item
              key='home'
              onClick={() => {
                history.push('/')
              }}
            >
              <Icon type='home' />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item
              key='5'
              key=''
              onClick={() => {
                history.push('/studentregister')
              }}
            >
              {' '}
              <Icon type='user-add' />
              <span>Add Student/Faculty</span>
            </Menu.Item>
            <Menu.Item
              key='logout'
              onClick={e => {
                this.logout()
              }}
            >
              <Icon type='logout' />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
      )
    } else {
      return (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          collapsedWidth={width < 768 ? 0 : undefined}
          width={200}
          style={{ paddingTop: '20px' }}
          trigger={null}
        >
          {width > 768 && (
            <div
              style={{
                color: '#fff',
                width: '100%',
                paddingLeft: !collapsed && '24px',
                textAlign: collapsed && 'center',
                paddingBottom: '44px'
              }}
            >
              <Icon
                style={{ marginRight: !collapsed && '10px' }}
                type='file-text'
                theme='filled'
              />
              {!collapsed && <span>eSkill Test</span>}
            </div>
          )}
          <Menu
            mode='inline'
            theme='dark'
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            style={{ height: '100%', borderRight: 0, paddingBottom: '100px' }}
          >
            <Menu.Item
              key='home'
              onClick={() => {
                history.push('/')
              }}
            >
              <Icon type='home' />
              <span>Home</span>
            </Menu.Item>

            <Menu.Item
              key='create'
              onClick={() => {
                history.push('/createtest')
              }}
            >
              <Icon type='schedule' />
              <span>Create Test</span>
            </Menu.Item>
            <Menu.Item
              key='5'
              key=''
              onClick={() => {
                history.push('/studentregister')
              }}
            >
              {' '}
              <Icon type='user-add' />
              <span>Add Student/Faculty</span>
            </Menu.Item>
            <Menu.Item
              key='logout'
              onClick={e => {
                this.logout()
              }}
            >
              <Icon type='logout' />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
      )
    }
  }
}

export default Board
