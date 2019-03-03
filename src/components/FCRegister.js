import React, { Component } from 'react'
import axios from 'axios'
import {
  Form,
  Input,
  Icon,
  Select,
  Button,
  Layout,
  AutoComplete,
  DatePicker
} from 'antd'
const { Option } = Select
const InputGroup = Input.Group

class FCRegister extends Component {
  constructor () {
    super()
    this.state = {
      regNumber: '',
      password: '',
      fullName: '',
      field: '',
      email: '',
      isAdmin: '',
      dob: ''
    }
  }
  onDateChange = (e, ed) => {
    this.state.dob = ed
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  onSelectChange = e => {
    if (e == 'Coordinator') this.state.isAdmin = 1
    else this.state.isAdmin = 2
  }
  onSubmit = e => {
    e.preventDefault()

    const {
      regNumber,
      password,
      fullName,
      field,
      email,
      dob,
      isAdmin
    } = this.state
    axios
      .post('http://localhost:3000/api/admin/registerfc', {
        regNumber,
        password,
        field,
        email,
        dob,
        fullName,
        isAdmin
      })
      .then(result => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  render () {
    const { regNumber, password, fullName, email, dob } = this.state
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const config = {
      rules: [
        {
          type: 'object',
          required: true,
          message: 'Please select time!',
          value: dob
        }
      ]
    }

    return (
      <div>
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
          .custom-form .ant-form-item-label label {
            color: #ddd !important;
          }
        `}</style>
        <Form
          style={{ padding: 0, maxWidth: 500 }}
          onSubmit={this.onSubmit}
          className='custom-form'
        >
          <Form.Item label='Full Name Of the Student:'>
            <Input
              size='large'
              style={{ width: 400 }}
              prefix={<Icon type='user' />}
              name='fullName'
              onChange={this.onChange}
              value={fullName}
              placeholder='Full Name'
            />
          </Form.Item>
          <Form.Item label='Choose'>
            <InputGroup compact style={{ width: 600 }} defaultValue='Choose'>
              <Select
                defaultValue={'Faculty/Coordinator'}
                name='choose'
                onChange={this.onSelectChange}
              >
                <Option value='NUll'>Choose</Option>
                <Option value='Faculty'>Faculty</Option>
                <Option value='Coordinator'>Coordinator</Option>
              </Select>
            </InputGroup>
          </Form.Item>
          <Form.Item label='Faculty/Coordinator ID'>
            <Input
              size='large'
              style={{ width: 400 }}
              name='regNumber'
              onChange={this.onChange}
              value={regNumber}
              placeholder='Faculty/Coordinator ID'
            />
          </Form.Item>
          <Form.Item style={{ width: 400 }} label='Date Of Birth:'>
            <DatePicker
              setFieldsValue={dob}
              name='dob'
              onChange={this.onDateChange}
            />
          </Form.Item>
          <Form.Item label='E-mail'>
            <Input
              size='large'
              display='flex'
              name='email'
              value={email}
              style={{ width: 400 }}
              onChange={this.onChange}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item label='Password'>
            <Input
              prefix={<Icon type='lock' />}
              size='large'
              style={{ width: 400 }}
              name='password'
              onChange={this.onChange}
              value={password}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
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
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const WrappedTimeRelatedForm = Form.create({ name: 'time_related_controls' })(
  FCRegister
)
export default Form.create()(WrappedTimeRelatedForm)
