import React from 'react'
import { Button, Table, Modal, InputNumber } from 'antd'
import { EditableCell, EditableFormRow } from './Editable'
import axios from 'axios'
export default class StudentTable extends React.Component {
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'regNumber',
        editable: true,
        width: '80%'
      },
      {
        title: ' ',
        render: e => <Button type='danger'>Delete</Button>
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

  handleDelete = key => {}

  handleAdd = () => {}

  handleSave = row => {}

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
    axios.get('http://localhost:3000/api/admin/faculties').then(res => {
      if (res.data.success) {
        this.setState({ dataSource: res.data.faculties })
      }
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
          Add a student
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleAdd}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          closable={false}
        >
          <InputNumber value={this.state.n} onChange={this.onInputChange} />
        </Modal>
        {dataSource.length > 0 && (
          <Table
            className='student-table'
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={dataSource.length > 10}
          />
        )}
      </div>
    )
  }
}
