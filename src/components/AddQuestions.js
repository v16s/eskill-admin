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
  DatePicker,
  InputNumber
} from 'antd'
const { Option } = Select
const InputGroup = Input.Group

class AddQuestions extends Component {
    constructor () {
        super()
        this.state = {
          campus: [],
          departments: [],
          coures: [],
        }
      }
      componentDidMount () {
    const { campus, departments } = this.state
    axios
      .get('http://localhost:3000/api/global/global', {
        campus,
        departments,
      })
      .then(result => {
        console.log(result)
        this.setState({ campus:result.data.campus,departments:result.data.departments })
      })
      .catch(err => {
        console.log(err)
      })
  }
  onDepartmentChange = e => {
    this.setState({ department: e })
  
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  onSubmit = e => {
    e.preventDefault()

    const {
        // fields
    } = this.state

    axios
      .post('http://localhost:3000', {
    
      })
      .then(result => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
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
          .custom-form .ant-form-item-label label {
            color: #ddd !important;
          }
        `}</style>
        <Form
          style={{ padding: 0, maxWidth: 500 }}
          onSubmit={this.onSubmit}
          className='custom-form'
        >
          <Form.Item>
            <Select
              defaultValue={'Department'}
              name='campus'
              onChange={this.onDepartmentChange}
              style={{ width: '100%' }}
              size='large'
            >
              {this.state.departments.map((b) => (
                <Option key={b} value={b}>
                  {b}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Choose'>
            <InputGroup compact style={{ width: 600 }} defaultValue='Course'>
              <Select>
                <Option >Choose</Option>
                <Option >Course 1</Option>
                <Option >Course 2</Option>
                <Option >Course 3</Option>
                <Option >Course 4</Option>
                <Option >Course 5</Option>
              </Select>
            </InputGroup>
          </Form.Item>
          <Form.Item label='Question Number'>
            <InputNumber
              size='large'
              display='flex'
              placeholder='Question Number'
            />
          </Form.Item>
          <Form.Item label='Title'>
            <Input
              size='large'
              display='flex'
              placeholder='Title'
            />
          </Form.Item>
          <Form.Item label='Description'>
            <Input
              size='large'
              display='flex'
              placeholder='Description'
            />
          </Form.Item>
          <Form.Item
          label="Upload"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default AddQuestions
