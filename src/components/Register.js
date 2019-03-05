import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Layout, Select } from 'antd'
const { Header, Content, Footer } = Layout
const InputGroup = Input.Group
const Option = Select.Option

class Create extends Component {
  constructor () {
    super()
    this.state = {
      regNumber: '',
      password: '',
      fullName: '',
      campus: [],
      departments: [],
      email: '',
      dob: '',
      college: '',
      department: ''
    }
  }
  componentDidMount () {
    const { campus, departments } = this.state
    axios
      .get('http://localhost:3000/api/global/', {
        campus,
        departments
      })
      .then(result => {
        console.log(result)
        this.setState({
          campus: result.data.campus,
          departments: result.data.departments
        })
        console.log(departments)
      })
      .catch(err => {
        console.log(err)
      })
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  onSelectChange = e => {
    this.setState({ college: e })
  }
  onDepartmentChange = e => {
    this.setState({ department: e })
  }

  onSubmit = e => {
    e.preventDefault()

    const {
      regNumber,
      password,
      fullName,
      email,
      dob
    } = this.state

    axios
      .post('http://localhost:3000/api/auth/register', {
        regNumber,
        password,
        department,
        college,
        email,
        fullName,
        dob
      })
      .then(result => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    const {
      regNumber,
      password,
      fullName,
      email,
    } = this.state
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
          .custom-form .ant-input-affix-wrapper .ant-input-prefix,
          .ant-input-affix-wrapper .ant-input-suffix {
            color: #1890ff !important;
          }
          .custom-form .ant-input,
          .custom-form .ant-input:focus,
          .custom-form .ant-input:hover,
          .custom-form .ant-select-arrow {
            background-color: #001f3d !important;
            border-color: transparent !important;
            color: #fff !important;
          }
          .custom-form .ant-select-selection {
            background-color: #001f3d !important;
            color: #fff !important;
            border-color: transparent !important;
          }
          internal-autofill-previewed,
          input:-internal-autofill-selected,
          textarea:-internal-autofill-previewed,
          textarea:-internal-autofill-selected,
          select:-internal-autofill-previewed,
          select:-internal-autofill-selected {
            box-shadow: inset 0 0 0px 9999px #00284f;
            border-color: transparent !important;
          }
        `}</style>
        <Form
          style={{
            maxWidth: '500px',
            alignSelf: 'center',
            backgroundColor: '#000d19',
            padding: '25px',
            borderRadius: '4px',
            width: '92%',
            fontFamily: 'sans-serif'
          }}
          onSubmit={this.onSubmit}
          className='custom-form'
        >
          <h2 style={{ marginBottom: '25px', color: '#d6e9ff' }}>Register</h2>
          <Form.Item>
            <Input
              size='large'
              prefix={<Icon type='user' />}
              name='fullName'
              onChange={this.onChange}
              value={fullName}
              placeholder='Full Name'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='regNumber'
              onChange={this.onChange}
              value={regNumber}
              placeholder='Registration Number'
            />
          </Form.Item>
          <Form.Item>
            <Select
              defaultValue={'Campus'}
              name='campus'
              onChange={this.onSelectChange}
              style={{ width: '100%' }}
              size='large'
            >
              {this.state.campus.map(b => (
                <Option key={b} value={b}>
                  {b}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              defaultValue={'Department'}
              name='campus'
              onChange={this.onDepartmentChange}
              style={{ width: '100%' }}
              size='large'
            >
              {this.state.departments.map(b => (
                <Option key={b} value={b}>
                  {b}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              display='flex'
              name='email'
              value={email}
              onChange={this.onChange}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type='lock' />}
              size='large'
              name='password'
              onChange={this.onChange}
              value={password}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item style={{ color: '#fff', marginBottom: 0 }}>
            <Button
              type='primary'
              className='login-form-button'
              style={{
                width: '100%',
                textAlign: 'center',
                position: 'center'
              }}
              onClick={this.onSubmit}
            >
              Register
            </Button>
            <Link to='/'>Login</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Create
