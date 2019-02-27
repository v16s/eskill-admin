import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  message
} from 'antd'
const { Header, Content, Footer } = Layout

class Login extends Component {
  constructor () {
    super()
    this.state = {
      regNumber: '',
      password: '',
      message: '',
      err: ''
    }
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = e => {
    e.preventDefault()

    const { regNumber, password } = this.state

    axios
      .post('http://localhost:3000/api/auth/admin/login', {
        regNumber,
        password
      })
      .then(result => {
        console.log(result)
        localStorage.setItem('jwtToken', result.data.token)
        this.setState({ message: '' })
        this.props.login(result.data.user)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg })
        }
      })
  }

  render () {
    const { regNumber, password } = this.state
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Form
          style={{
            maxWidth: '500px',
            alignSelf: 'center',
            border: '1px solid #ddd',
            padding: '25px',
            borderRadius: '4px'
          }}
          onSubmit={this.onSubmit}
          className='login-form'
        >
          <h2 style={{ marginBottom: '25px', color: '#777' }}>
            eSkill - Admin
          </h2>
          <Form.Item>
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              name='regNumber'
              onChange={this.onChange}
              value={regNumber}
              placeholder='regNumber'
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              name='password'
              onChange={this.onChange}
              value={password}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item
            validateStatus={this.state.err != '' ? 'error' : undefined}
            help={this.state.err != '' ? this.state.err : undefined}
          >
            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              style={{
                width: '100%'
              }}
            >
              Log in
            </Button>
            Or <Link to='/register'>register now!</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login
