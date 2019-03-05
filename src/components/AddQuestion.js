import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Icon, Select, Button, Upload, InputNumber } from 'antd'
const { Option } = Select
const InputGroup = Input.Group
const {TextArea}= Input

class AddQuestion extends Component {
  constructor () {
    super()
    this.state = {
      branch: '',
      course: '',  
      Qnumber: '',
      title: '',
      definition: '',
      dataSource: [],

    }
  }
  componentDidMount () {
    const dataSource = this.state
    axios.get('http://localhost:3000/api/global/branches').then(res => {
      console.log(res.data)
      this.setState({ dataSource: res.data.branches })
    })
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  onBranchChange = e => {
    this.setState({ branch: e })
  }
  onSelectChange = e => {
    this.setState({ course: e })
  }
  normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  onSubmit = e => {
    e.preventDefault()

    const {
      branch,
      course, 
      title ,
      definition 
    } = this.state

    axios
      .post('http://localhost:3000/api/global/ash', {
        branch,
        course,  
        title ,
        definition 
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
      branch,
      course,
      title ,
      definition 
    } = this.state
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
          <Form.Item label='Branch'>
            <Select
              style={{ width: 400 }}
              defaultValue={'Choose Branch...'}
              name='branch'
              onChange={this.onBranchChange}
              value={branch}
              size='large'
              style={{ width: '100%' }}
            >
              {this.state.dataSource.map(b => (
                <Option key={b.name} value={b.name}>
                  {b.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Course'>
            <Select
              compact style={{ width: 400 }}
              defaultValue={'Choose Course...'}
              name='course'
              onChange={this.onSelectChange}
              size='large'
              style={{ width: '100%' }}
            >
              {this.state.dataSource.map(function (b) {
                if (b.name == branch) {
                  return b.courses.map(c => (
                    <Option key={c.name} value={c.name}>
                      {c.name}
                    </Option>
                  ))
                }
              })}
            </Select>
          </Form.Item>
          <Form.Item label='Title'>
            <Input 
            style={{ width: 400 }} 
            size='large' 
            display='flex' 
            name='title'
            onChange={this.onChange}
            value={title}
            placeholder='Title' />
          </Form.Item>
          <Form.Item label='Description'>
            <Input.TextArea 
            id='definiton'
            style={{ width: 400 }} 
            rows={4}
            name='definition'
            value={definition}
            onChange={this.onChange}
             />
          </Form.Item>
          <Form.Item label='Upload'>
             <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload the image</p>
              </Upload.Dragger>
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

export default AddQuestion
