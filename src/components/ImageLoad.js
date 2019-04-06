import React, { Component } from 'react'
import Spinner from 'react-spinkit'
class LoadScreen extends Component {
  render () {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          minHeight: '400px',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px'
        }}
      >
        <Spinner name='line-scale' color='#1890ff' />
      </div>
    )
  }
}

export default LoadScreen
