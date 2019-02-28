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
        <style jsx global>{`
          .login-form .ant-input-affix-wrapper .ant-input-prefix,
          .ant-input-affix-wrapper .ant-input-suffix {
            color: #1890ff !important;
          }
          .login-form .ant-input,
          .login-form .ant-input:focus,
          .login-form .ant-input:hover {
            background-color: #001f3d !important;
            border-color: transparent !important;
            color: #fff !important;
          }
          internal-autofill-previewed,
          input:-internal-autofill-selected,
          textarea:-internal-autofill-previewed,
          textarea:-internal-autofill-selected,
          select:-internal-autofill-previewed,
          select:-internal-autofill-selected {
            box-shadow: inset 0 0 0px 9999px #00284f;
          }
        `}</style>
        <Form
          style={{
            maxWidth: '350px',
            alignSelf: 'center',
            backgroundColor: '#000d19',
            padding: '25px',
            borderRadius: '4px',
            width: '92%',
            fontFamily: 'sans-serif'
          }}
          onSubmit={this.onSubmit}
          className='login-form'
        >
          <h2 style={{ marginBottom: '25px', color: '#d6e9ff' }}>Login</h2>
          <Form.Item>
            <Input
              prefix={<Icon type='user' />}
              name='regNumber'
              onChange={this.onChange}
              value={regNumber}
              placeholder='regNumber'
              size='large'
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type='lock' />}
              name='password'
              onChange={this.onChange}
              value={password}
              type='password'
              placeholder='Password'
              size='large'
            />
          </Form.Item>
          <Form.Item
            style={{
              color: '#fff',
              marginBottom: 0
            }}
            validateStatus={this.state.err != '' ? 'error' : undefined}
            help={this.state.err != '' ? this.state.err : undefined}
          >
            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              className='login-form-button'
              style={{
                width: '100%'
              }}
            >
              Log in
            </Button>
            <Link to='/register' style={{ color: '#888' }}>
              Register
            </Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login
