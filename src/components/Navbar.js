import React from 'react'
import history from '../components/history'
import { Icon, Layout, Menu } from 'antd'
const { Sider } = Layout
const { SubMenu } = Menu

class Board extends React.Component {
  logout () {
    localStorage.removeItem('jwtToken')
    window.location.reload()
  }
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    collapsed: window.innerWidth < 768
  }
  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }
  render () {
    const { collapsed } = this.state
    let { width } = this.state
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        collapsedWidth={width < 768 ? 0 : undefined}
        width={200}
        style={{ paddingTop: '20px' }}
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
              history.push('/register')
            }}
          >
            {' '}
            <Icon type='user-add' />
            <span>Add Faculty/Coordinator</span>
          </Menu.Item>

          <Menu.Item
            key='logout'
            onClick={e => {
              this.logout()
            }}
          >
          <Menu.Item
              key='5'
              onClick={() => {
                history.push('/addcourse')
              }}
            >
              <Icon type="folder-add" />
              <span>Add Course</span>
            </Menu.Item>
            <Icon type='logout' />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }


export default Board
