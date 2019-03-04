import React from 'react'
import { Header, Navbar } from 'components'
import { Layout } from 'antd'
const { Content } = Layout

export default class LoggedInWrapper extends React.Component {
  render () {
   console.log(this.props.level)
    return (
      <Layout
        style={{
          backgroundColor: '#000d19',
          color: '#fff',
          minHeight: '100vh'
        }}
      >
        <style jsx global>{`
          .ant-layout-sider-zero-width-trigger {
            z-index: 2 !important;
          }
          .ant-btn-danger {
            background-color: #ff4d4f;
            border-color: #ff4d4f;
            color: #fff;
          }
        `}</style>
        <Navbar lvl={this.props.level} />
        <Layout>
          <Content style={{ backgroundColor: '#000d19', padding: '20px' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
