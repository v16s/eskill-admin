import React from 'react'
import { Input, Button, Table, Popconfirm, Modal } from 'antd'
import axios from 'axios'
import { EditableCell, EditableFormRow } from './editable'
import SessionTable from './SessionTable'
export default class CourseTable extends React.Component {
  cols
  constructor (props) {
    super(props)
    this.cols = [
      {
        title: 'Course',
        dataIndex: 'name',
        width: '80%',
        editable: true
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.props.dataSource.length >= 1 ? (
            <Popconfirm
              title='Sure to delete?'
              onConfirm={e => this.handleDelete(record)}
            >
              <Button type='danger'>Delete</Button>
            </Popconfirm>
          ) : null
      }
    ]
    this.state = {
      visible: false,
      confirmLoading: false
    }
  }
  handleDelete = ({ name: courseName }) => {
    axios
      .post('http://localhost:3000/api/admin/removeCourse', {
        name: this.props.branch,
        courseName
      })
      .then(res => {
        if (res.data.success) {
          this.props.update(res.data.branch)
        }
      })
  }
  handleAdd = e => {
    this.setState({ confirmLoading: true }, () => {
      axios
        .post('http://localhost:3000/api/admin/addCourse', {
          courseName: document.getElementById('courseName').value,
          name: this.props.branch
        })
        .then(res => {
          if (res.data.success) {
            this.props.update(res.data.branch)
            this.setState({ confirmLoading: false, visible: false })
          }
        })
    })
  }
  handleSave = ({ name, newName }) => {
    axios
      .post('http://localhost:3000/api/admin/editCourse', {
        courseName: name,
        newCourseName: newName,
        name: this.props.branch
      })
      .then(res => {
        if (res.data.success) {
          this.props.update(res.data.branch)
        } else {
          console.log(res)
        }
      })
  }
  columns = () =>
    this.cols.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: row => {
            this.handleSave(row, this.props.label)
          }
        })
      }
    })
  components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  modal = () => {
    this.setState({ visible: true })
  }
  render () {
    const { dataSource, label } = this.props
    console.log(this.props)
    return (
      <div>
        <Button
          onClick={this.modal}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          Add a Course
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleAdd}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          title={null}
          closable={false}
        >
          <Input id='courseName' />
        </Modal>
        {dataSource.length > 0 && (
          <Table
            className='question-table'
            components={this.components}
            rowClassName={() => 'editable-row'}
            bordered
            pagination={dataSource.length > 10}
            dataSource={dataSource}
            columns={this.columns()}
            rowKey={'course-table'}
            expandedRowRender={record => (
              <SessionTable
                dataSource={record.session.map(d => ({
                  name: d
                }))}
                update={this.props.update}
                branch={this.props.branch}
                course={record.name}
              />
            )}
          />
        )}
      </div>
    )
  }
}
