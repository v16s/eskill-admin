import React, { Component } from 'react'
import { Row, Col, Form, Input, Upload, Modal, Radio, Button, Icon } from 'antd'
import { toArray, chunk, compact } from 'lodash'
import ImageLoad from './ImageLoad'
import axios from 'axios'
const { TextArea } = Input
const { Group: RadioGroup, Button: RadioButton } = Radio
export default class EditQuestions extends Component {
  state = {
    answer: this.props.record.answer,
    fileList: [],
    opt1: this.props.record.options['1'],
    opt2: this.props.record.options['2'],
    opt3: this.props.record.options['3'],
    opt4: this.props.record.options['4'],
    title: this.props.record.title,
    definition: this.props.record.definition,
    n: this.props.record.n,
    branch: this.props.record.branch,
    course: this.props.record.course,
    confirmLoading: false
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  toImage = (dataurl, filename) => {
    var arr = dataurl.split(',')

    var mime = arr[0].match(/:(.*?);/)[1]

    var bstr = atob(arr[1])

    var n = bstr.length

    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
  uploadButton = (
    <div>
      <Icon type='plus' />
      <div className='ant-upload-text'>Upload</div>
    </div>
  )
  componentDidMount () {
    let { branch, course, n } = this.props.record
    axios
      .get(
        `http://localhost:3000/api/coordinator/question/${branch}/${course}/${n}/image`
      )
      .then(res => {
        if (res.data && res.data != 'none') {
          console.log(
            this.toImage(
              'data:image/jpeg;base64, ' + res.data.image,
              'image.jpeg'
            )
          )
          this.setState({
            image: this.toImage(
              'data:image/jpeg;base64, ' + res.data.image,
              'image.jpeg'
            ),
            fileList: [
              {
                originFileObj: this.toImage(
                  'data:image/jpeg;base64, ' + res.data.image,
                  'image.jpeg'
                ),
                name: 'image.jpeg',
                thumbUrl: 'data:image/jpeg;base64, ' + res.data.image,
                type: 'image/jpeg',
                uid: 'image'
              }
            ]
          })
        } else {
          this.setState({ image: 'none' })
        }
      })
      .catch(error => {})
  }
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  beforeUpload = file => {
    this.setState({ file })
    return false
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList, imageEdited: true, del: fileList.length == 0 })
  }
  onSubmit = e => {
    const {
      branch,
      course,
      title,
      definition,
      opt1,
      opt2,
      opt3,
      opt4,
      file,
      answer,
      imageEdited,
      del,
      n
    } = this.state

    this.setState({ confirmLoading: true }, () => {
      if (del || !imageEdited) {
        axios
          .post('http://localhost:3000/api/coordinator/editquestion', {
            definition,
            branch,
            course,
            title,
            options: JSON.stringify({ 1: opt1, 2: opt2, 3: opt3, 4: opt4 }),
            answer,
            del,
            n
          })
          .then(result => {
            this.props.handleCancel(true)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        let formData = new FormData()
        formData.append('branch', branch)
        formData.append('course', course)
        formData.append('title', title)
        formData.append('definition', definition)
        formData.append(
          'options',
          JSON.stringify({ 1: opt1, 2: opt2, 3: opt3, 4: opt4 })
        )
        formData.append('answer', answer)
        formData.append('n', n)

        formData.append('image', file)
        axios
          .post(
            'http://localhost:3000/api/coordinator/editquestion',
            formData,
            {
              headers: { 'content-type': 'multipart/form-data' }
            }
          )
          .then(result => {
            this.props.handleCancel(true)
            this.setState({ confirmLoading: false })
          })
          .catch(err => {})
      }
    })
  }
  handlepreviewCancel = e => {
    this.setState({ previewVisible: false })
  }
  render () {
    let { visible, handleCancel, onSubmit, record } = this.props
    let {
      fileList,
      title,
      definition,
      previewVisible,
      previewImage,
      confirmLoading
    } = this.state
    return (
      <Modal
        visible={visible}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            onClick={this.onSubmit}
            loading={confirmLoading}
            type='primary'
          >
            Update
          </Button>
        ]}
      >
        {previewVisible && (
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handlepreviewCancel}
          >
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal>
        )}
        <Form
          style={{ padding: 0 }}
          onSubmit={onSubmit}
          className='custom-form'
        >
          <Form.Item label='Title'>
            <Input
              style={{ width: '100%' }}
              size='large'
              display='flex'
              name='title'
              onChange={this.onChange}
              defaultValue={title}
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
              name='answer'
              value={this.state.answer}
              style={{
                width: '100%'
              }}
            >
              {chunk(
                compact(toArray({ ...record.options, _id: undefined })),
                2
              ).map((row, ri) => (
                <Row gutter={16} style={{ marginTop: '15px' }}>
                  {row.map((c, i) => (
                    <Col md={12}>
                      <RadioButton
                        value={i + ri * 2 + 1}
                        style={{ width: '100%', height: 'auto' }}
                      >
                        <Input
                          name={`opt${i + ri * 2 + 1}`}
                          size='large'
                          onChange={this.onChange}
                          value={this.state[`opt${i + ri * 2 + 1}`]}
                          style={{ margin: '2px 0' }}
                        />
                      </RadioButton>
                    </Col>
                  ))}
                </Row>
              ))}
            </RadioGroup>
          </Form.Item>
          {this.state.image ? (
            <Form.Item label='Upload'>
              <Upload
                listType='picture-card'
                fileList={this.state.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}
              >
                {fileList.length < 1 && this.uploadButton}
              </Upload>
            </Form.Item>
          ) : (
            <ImageLoad />
          )}
        </Form>
      </Modal>
    )
  }
}
