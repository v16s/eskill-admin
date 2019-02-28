import React from 'react'
import { Header, Navbar } from 'components'
import { Layout } from 'antd'
const { Content } = Layout

export default class LoggedInWrapper extends React.Component {
  state = {
    collapsed: window.innerWidth < 768
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render () {
    return (
      <Layout
        style={{
          backgroundColor: '#000d19',
          color: '#fff',
          minHeight: '100vh'
        }}
      >
        <Navbar
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width={this.state.width}
        />
        <Layout>
          <Header onCollapse={this.onCollapse} collapsed={this.state} />
          <Content style={{ backgroundColor: '#000d19', padding: '20px' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
