import React from 'react'
import { Icon, Layout } from 'antd'
const { Header } = Layout
export default class MainHeader extends React.Component {
  state = { width: window.innerWidth, height: window.innerHeight }
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
  render () {
    let { width } = this.state

    if (width < 768) {
      return (
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            style={{ padding: '0 24px' }}
            className='trigger'
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.onCollapse}
          />
        </Header>
      )
    }
    return null
  }
}
