import React from 'react'
import { Input, Button, Table, Popconfirm, Form, Modal } from 'antd'
import { reject } from 'lodash'
import axios from 'axios'
import { EditableCell, EditableFormRow } from './Editable'
import CourseTable from './CourseTable'

export default class BranchTable extends React.Component {
  columns
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'name',
        editable: true,
        width: '80%'
      },
      {
        title: ' ',
        render: record => (
          <Button type='danger' onClick={e => this.handleDelete(record)}>
            Delete
          </Button>
        )
      }
    ]

    this.state = {
      dataSource: [],
      count: 0,
      sessionCount: 0,
      sessionSource: [],
      visible: false,
      n: 0,
      confirmLoading: false
    }
  }
  update = element => {
    this.setState({
      dataSource: this.state.dataSource.map(d =>
        d.name == element.name ? element : d
      )
    })
  }
  handleDelete = ({ name }) => {
    axios
      .post('http://localhost:3000/api/admin/removeBranch', {
        name
      })
      .then(res => {
        if (res.data.success) {
          this.setState({ dataSource: reject(this.state.dataSource, { name }) })
        }
      })
  }
  handleAdd = e => {
    this.setState({ confirmLoading: true }, () => {
      axios
        .post('http://localhost:3000/api/admin/addBranch', {
          name: document.getElementById('branchName').value
        })
        .then(res => {
          this.setState({
            dataSource: [...this.state.dataSource, res.data.branch],
            confirmLoading: false,
            visible: false
          })
        })
    })
  }
  handleSave = ({ name, newName }) => {
    axios
      .post('http://localhost:3000/api/admin/editBranch', {
        name,
        newName
      })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.branch)
          this.setState({
            dataSource: this.state.dataSource.map(d =>
              d.name === name ? { ...d, name: newName } : d
            )
          })
        } else {
          console.log(res)
        }
      })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }
  onInputChange = n => {
    this.setState({ n })
  }
  modal = () => {
    this.setState({ visible: true })
  }
  componentDidMount () {
    axios.get('http://localhost:3000/api/admin/branches').then(res => {
      this.setState({ dataSource: res.data.branches })
    })
  }
  render () {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }
    const columns = this.columns.map(col => {
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
          handleSave: this.handleSave
        })
      }
    })
    return (
      <div>
        <Button
          onClick={this.modal}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          Add a Branch
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleAdd}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          title={null}
          closable={false}
        >
          <Input id='branchName' />
        </Modal>
        {dataSource.length > 0 && (
          <Table
            className='student-table'
            components={components}
            pagination={dataSource.length > 10}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            expandedRowRender={record => (
              <CourseTable
                dataSource={record.courses}
                update={this.update}
                branch={record.name}
              />
            )}
          />
        )}
      </div>
    )
  }
}
