import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Layout,
  AutoComplete,
  Menu,
  DatePicker
} from 'antd';
import Password from 'antd/lib/input/Password';
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const AutoCompleteOption = AutoComplete.Option;
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
      <Layout>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'left',
            minHeight: '300vh'
          }}
        >
          <Form onSubmit={this.onSubmit} className='login-form'>
            <Form.Item
              label='Full Name Of the Student:'
              style={{ color: 'rgba(0,0,0,.25)', fontSize: '24' }}
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
              {getFieldDecorator('date-picker', config)(
                <DatePicker setFieldsValue={dob} />
              )}
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
        <Footer style={{ textAlign: 'center' }} />
      </Layout>
    );
  }
}
const WrappedTimeRelatedForm = Form.create({ name: 'time_related_controls' })(
  StudentRegister
);
export default Form.create()(WrappedTimeRelatedForm);
