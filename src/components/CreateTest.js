import React from 'react'
import axios from 'axios'
import { Form, Input, Button, Select } from 'antd'
import { history } from 'components'
const Option = Select.Option

class CreateTest extends React.Component {
  constructor () {
    super()
    this.state = {
      branch: '',
      course: '',
      questions: '',
      time: '',
      number: '',
      testID: ''
    }
  }
  onBranchChange = e => {
    this.setState({ branch: e })
  }
  onSelectChange = e => {
    this.setState({ course: e })
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  onSubmit = e => {
    e.preventDefault()

    const { branch, course, questions, time, testID, number } = this.state

    axios
      .post('http://localhost:3000/api/admin/createTest', {
        branch,
        course,
        questions,
        time,
        testID,
        number
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
  render () {
    const { branch, course, questions, time, testID, number } = this.state
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
          <Form.Item label='Unique Test ID'>
            <Input
              size='large'
              name='testID'
              onChange={this.onChange}
              value={testID}
              type='String'
              placeholder='Test ID'
            />
          </Form.Item>
          <Form.Item label='Branch'>
            <Select
              defaultValue={'choose'}
              name='branch'
              onChange={this.onBranchChange}
              size='large'
              style={{ width: '100%' }}
            >
              <Option value='NUll'>Choose</Option>
              <Option value='CSE'>CSE</Option>
              <Option value='ECE'>ECE</Option>
              <Option value='MECH'>MECH</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Course'>
            <Select
              defaultValue={'choose'}
              name='course'
              onChange={this.onSelectChange}
              size='large'
              style={{ width: '100%' }}
            >
              <Option value='NUll'>Choose</Option>
              <Option value='Something'>Something</Option>
              <Option value='Som'>Som</Option>
              <Option value='somet'>Somet</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Questions'>
            <Input
              size='large'
              name='questions'
              onChange={this.onChange}
              value={questions}
              type='number'
              placeholder='No of questions'
            />
          </Form.Item>
          <Form.Item label='Test Time'>
            <Input
              size='large'
              name='time'
              onChange={this.onChange}
              value={time}
              type='number'
              placeholder='Total Time'
            />
          </Form.Item>
          <Form.Item label='Test Time'>
            <Input
              size='large'
              name='number'
              onChange={this.onChange}
              value={number}
              type='number'
              placeholder='Number of Students'
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              size='large'
              className='Submit-button'
              onClick={this.onSubmit}
              style={{ width: '100%' }}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default CreateTest
