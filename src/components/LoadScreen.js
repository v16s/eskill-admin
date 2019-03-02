import React from 'react'
import Spinner from 'react-spinkit'
export default () => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      flexGrow: '1',
      alignItems: 'center'
    }}
  >
    <Spinner name='cube-grid' color='#1890ff' />
  </div>
)
