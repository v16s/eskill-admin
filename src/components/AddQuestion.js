import React, { Component } from 'react'
import axios from 'axios'
import {
  Form,
  Input,
  Icon,
  Select,
  Button,
  Upload,
  Radio,
  Row,
  Col
} from 'antd'
const { Option } = Select
const { Group: RadioGroup, Button: RadioButton } = Radio
class AddQuestion extends Component {
  constructor () {
    super()
    this.state = {
      branch: '',
      course: '',
      Qnumber: '',
      title: '',
      definition: '',
      opt1: '',
      opt2: '',
      opt3: '',
      opt4: '',
      dataSource: [],
      fileList: []
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
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  beforeUpload = e => {
    this.setState({ img: e.file })
    return false
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = e => {
    e.preventDefault()

    const { branch, course, title, definition, opt1, opt2, opt3, opt4, fileList } = this.state

    axios
      .post('http://localhost:3000/api/coordinator/addquestion', {
        branch,
        course,
        title,
        definition,
        opt1,
        opt2,
        opt3,
        opt4,
        fileList
      })
      .then(result => {
        if (result.data.success) {
          history.push('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  beforeUpload = file => {
    this.setState({ file })
    return false
  }
  uploadButton = (
    <div>
      <Icon type='plus' />
      <div className='ant-upload-text'>Upload</div>
    </div>
  )
  render () {
    const {
      branch,
      course,
      dataSource,
      title,
      definition,
      fileList,
      opt1,
      opt2,
      opt3,
      opt4
    } = this.state
    return (
      <div>
        <style jsx global>{/* CSS */ `
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
          .ant-radio-button-wrapper {
            background-color: #00417f;
            border-color: #00417f;
            color: #fff;
          }
          .custom-form .ant-form-item-label label {
            color: #ddd !important;
          }
          .ant-upload.ant-upload-drag {
            background: #001f3d;
            border-color: #001f3d;
            color: #fff;
            p.ant-upload-text {
              color: #fff;
            }
          }
          .ant-radio-group-solid
            .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
          .ant-radio-group-solid
            .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
            background-color: #00db95;
            border-color: #00db95;
            .ant-input,
            .ant-input:focus,
            .ant-input:hover,
            .ant-select-arrow {
              background-color: #002d19 !important;
              border-color: transparent !important;
              color: #fff !important;
            }
          }
          .ant-radio-button-wrapper:first-child {
            border-left-color: transparent;
          }
        `}</style>
        <Form
          style={{ padding: 0, maxWidth: 500 }}
          onSubmit={this.onSubmit}
          className='custom-form'
        >
          <Form.Item label='Branch'>
            <Select
              style={{ width: '100%' }}
              defaultValue={'Choose Branch...'}
              name='branch'
              onChange={this.onBranchChange}
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
              compact
              style={{ width: 400 }}
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
              style={{ width: '100%' }}
              size='large'
              display='flex'
              name='title'
              onChange={this.onChange}
              value={title}
              placeholder='Title'
            />
          </Form.Item>
          <Form.Item label='Description'>
            <Input.TextArea
              id='definiton'
              style={{ width: '100%' }}
              rows={4}
              name='definition'
              value={definition}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item label='Answer'>
            <RadioGroup
              buttonStyle='solid'
              onChange={this.onChange}
              name='radiogroup'
              style={{
                width: '100%'
              }}
            >
              <Row gutter={16}>
                <Col md={12}>
                  <RadioButton
                    value={1}
                    style={{ width: '100%', height: 'auto' }}
                  >
                    <Input
                      name='opt1'
                      size='large'
                      value={opt1}
                      onChange={this.onChange}
                      placeholder='Option 1'
                      style={{ margin: '2px 0' }}
                    />
                  </RadioButton>
                </Col>
                <Col md={12}>
                  <RadioButton
                    value={2}
                    style={{ width: '100%', height: 'auto' }}
                  >
                    <Input
                      name='opt2'
                      size='large'
                      value={opt2}
                      onChange={this.onChange}
                      placeholder='Option 2'
                      style={{ margin: '2px 0' }}
                    />
                  </RadioButton>
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: '15px' }}>
                <Col md={12}>
                  <RadioButton
                    value={3}
                    style={{ width: '100%', height: 'auto' }}
                  >
                    <Input
                      name='opt3'
                      size='large'
                      value={opt3}
                      onChange={this.onChange}
                      placeholder='Option 3'
                      style={{ margin: '2px 0' }}
                    />
                  </RadioButton>
                </Col>
                <Col md={12}>
                  <RadioButton
                    value={4}
                    style={{ width: '100%', height: 'auto' }}
                  >
                    <Input
                      name='opt4'
                      size='large'
                      value={opt4}
                      onChange={this.onChange}
                      placeholder='Option 4'
                      style={{ margin: '2px 0' }}
                    />
                  </RadioButton>
                </Col>
              </Row>
            </RadioGroup>
          </Form.Item>
          <Form.Item label='Upload'>
            <Upload
              listType='picture-card'
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              beforeUpload={this.beforeUpload}
            >
              {fileList.length < 1 && this.uploadButton}
            </Upload>
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
