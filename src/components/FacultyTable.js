import React from 'react'
import { Button, Table, Modal, InputNumber } from 'antd'
import { EditableCell, EditableFormRow } from './Editable'
import axios from 'axios'
import FacultyList from './FacultyList'
import { reject } from 'lodash'
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
        render: record => (
          <Button
            onClick={e => {
              this.handleDelete(record)
            }}
            type='danger'
          >
            Delete
          </Button>
        )
      }
    ]

    this.state = {
      dataSource: [],
      visible: false,
      n: 0,
      confirmLoading: false,
      length: -1
    }
  }

  handleDelete = record => {
    axios
      .post('http://localhost:3000/api/admin/removefaculty', {
        regNumber: record.regNumber,
        testID: this.props.testID
      })
      .then(res => {
        this.setState({
          length: this.state.length - 1,
          dataSource: reject(this.state.dataSource, {
            regNumber: res.data.user.regNumber
          })
        })
      })
  }

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
    axios
      .get('http://localhost:3000/api/admin/faculties/' + this.props.testID)
      .then(res => {
        if (res.data.success) {
          this.setState({
            dataSource: res.data.faculties,
            length: res.data.faculties.length
          })
        }
      })
  }
  update = dataSource => {
    this.setState({ dataSource })
  }
  push = item => {
    const { dataSource } = this.state
    this.setState({
      dataSource: [...dataSource, item],
      visible: false,
      length: dataSource.length + 1
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
        <FacultyList
          visible={this.state.visible}
          handleAdd={this.handleAdd}
          confirmLoading={this.state.confirmLoading}
          handleCancel={this.handleCancel}
          testID={this.props.testID}
          push={this.push}
          modal={this.modal}
          length={this.state.length} // So that the modal refreshes everytime a faculty is removed
        />
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
