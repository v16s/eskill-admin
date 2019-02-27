import React from 'react'
import axios from 'axios'
import { Form, Input, Button, Layout, Card, Menu, Select } from 'antd'
const { Header, Content, Footer, Sider } = Layout
const InputGroup = Input.Group
const Option = Select.Option
const { Meta } = Card
const { SubMenu } = Menu

class CreateTest extends React.Component {
  constructor () {
    super()
    this.state = {
      branch: '',
      course: '',
      totQues: '',
      totTime: '',
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

    const { branch, course, totQues, totTime, testID } = this.state

    axios
      .post('http://localhost:3000/api/createTest', {
        branch,
        course,
        totQues,
        totTime,
        testID
      })
      .then(result => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    const { branch, course, totQues, totTime, testID } = this.state
    return (
      <div>
        <Form
          style={{ padding: 0 }}
          onSubmit={this.onSubmit}
          className='login-form'
        >
          <Form.Item label='Unique Test ID'>
            <Input
              size='large'
              style={{ width: 400 }}
              name='testID'
              onChange={this.onChange}
              value={testID}
              type='String'
              placeholder='Test ID'
            />
          </Form.Item>
          <Form.Item />
          <Form.Item label='Branch'>
            <InputGroup
              compact
              style={{ width: 400 }}
              defaultValue='Choose'
              value={branch}
            >
              <Select
                defaultValue={'choose'}
                name='branch'
                onChange={this.onBranchChange}
              >
                <Option value='NUll'>Choose</Option>
                <Option value='CSE'>CSE</Option>
                <Option value='ECE'>ECE</Option>
                <Option value='MECH'>MECH</Option>
              </Select>
            </InputGroup>
          </Form.Item>
          <Form.Item label='Course'>
            <InputGroup
              compact
              style={{ widthg: 400 }}
              defaultValue='Choose'
              value={course}
            >
              <Select
                defaultValue={'choose'}
                name='course'
                onChange={this.onSelectChange}
              >
                <Option value='NUll'>Choose</Option>
                <Option value='Something'>Something</Option>
                <Option value='Som'>Som</Option>
                <Option value='somet'>Somet</Option>
              </Select>
            </InputGroup>
          </Form.Item>
          <Form.Item label='Questions'>
            <Input
              size='large'
              style={{ width: 400 }}
              name='totQues'
              onChange={this.onChange}
              value={totQues}
              type='number'
              placeholder='No of questions'
            />
          </Form.Item>
          <Form.Item label='Test Time'>
            <Input
              size='large'
              style={{ width: 400 }}
              name='totTime'
              onChange={this.onChange}
              value={totTime}
              type='number'
              placeholder='Total Time'
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              size='large'
              className='Submit-button'
              onClick={this.onSubmit}
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
