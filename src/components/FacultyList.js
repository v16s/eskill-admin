import React from 'react'
import { List, Modal, Button } from 'antd'
import axios from 'axios'
import { reject } from 'lodash'
export default class FacultyList extends React.Component {
  state = { faculties: [] }
  getFaculties = () => {
    axios
      .get('http://localhost:3000/api/admin/allfaculties/' + this.props.testID)
      .then(res => {
        if (res.data.success) {
          this.setState({ faculties: res.data.faculties })
        }
      })
  }
  click = item => {
    axios
      .post('http://localhost:3000/api/admin/addfaculty', {
        ...item,
        testID: this.props.testID
      })
      .then(res => {
        if (res.data.success) {
          this.props.push(res.data.user)
          this.setState({
            faculties: reject(this.state.faculties, {
              regNumber: res.data.user.regNumber
            })
          })
        }
      })
  }
  shouldComponentUpdate (nextProps) {
    if (this.props.length != nextProps.length) {
      this.getFaculties()
    }
    return true
  }
  render () {
    let { faculties } = this.state
    return (
      <div>
        <Button
          className='btn-assign'
          onClick={this.props.modal}
          style={{ marginBottom: 16 }}
        >
          Assign a faculty
        </Button>
        {faculties.length > 0 && (
          <Modal
            visible={this.props.visible}
            onOk={this.props.handleAdd}
            confirmLoading={this.props.confirmLoading}
            onCancel={this.props.handleCancel}
            closable={false}
            footer={null}
          >
            <List
              size={'large'}
              bordered
              dataSource={this.state.faculties}
              renderItem={item => (
                <List.Item onClick={e => this.click(item)}>
                  {item.regNumber}
                </List.Item>
              )}
            />
          </Modal>
        )}
      </div>
    )
  }
}
