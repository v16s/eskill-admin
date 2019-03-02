import React, { Component } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Icon,
  Select,
  Button,
  Layout,
  AutoComplete,
  DatePicker
} from 'antd';
const { Option } = Select;
const InputGroup = Input.Group;

class StudentRegister extends Component {
  constructor() {
    super();
    this.state = {
      regNumber: '',
      password: '',
      fullName: '',
      college: '',
      field: '',
      email: '',
      isAdmin: 2,
      dob: '',
      facID: ''
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  onSelectChange = e => {
    this.setState({ college: e });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      regNumber,
      password,
      fullName,
      college,
      field,
      email,
      dob,
      isAdmin,
      facID
    } = this.state;
    axios
      .post('http://localhost:3000/api/auth/register', {
        regNumber,
        password,
        field,
        college,
        email,
        fullName,
        isAdmin
      })
      .then(result => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const {
      regNumber,
      password,
      fullName,
      college,
      field,
      email,
      dob,
      isAdmin,
      facID
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const config = {
      rules: [
        {
          type: 'object',
          required: true,
          message: 'Please select time!',
          value: dob
        }
      ]
    };

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
          <Form.Item
              label='Full Name Of the Student:'
            >
              <Input
                size='large'
                style={{ width: 400 }}
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name='fullName'
                onChange={this.onChange}
                value={fullName}
                placeholder='Full Name'
              />
            </Form.Item>
            <Form.Item label='Register Number'>
              <Input
                size='large'
                style={{ width: 400 }}
                name='regNumber'
                onChange={this.onChange}
                value={regNumber}
                placeholder='Registration Number'
              />
            </Form.Item>
            <Form.Item label='College'>
              <InputGroup
                compact
                style={{ width: 600 }}
                defaultValue='Choose'
                value={college}
              >
                <Select
                  defaultValue={'choose'}
                  name='college'
                  onChange={this.onSelectChange}
                >
                  <Option value='NUll'>Choose</Option>
                  <Option value='Vadapalani'>Vadapalani</Option>
                  <Option value='Ramapuram'>Ramapuram</Option>
                  <Option value='Katankalthur'>Katankalthur</Option>
                </Select>
              </InputGroup>
            </Form.Item>
            <Form.Item label='Department'>
              <Input
                size='large'
                style={{ width: 400 }}
                name='field'
                onChange={this.onChange}
                value={field}
                placeholder='Department'
              />
            </Form.Item>
            <Form.Item style={{ width: 400 }} label='Date Of Birth:'>
               <DatePicker setFieldsValue={dob} />
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
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
    );
  }
}
const WrappedTimeRelatedForm = Form.create({ name: 'time_related_controls' })(
  StudentRegister
);
export default Form.create()(WrappedTimeRelatedForm);
