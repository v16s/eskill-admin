import React from 'react'
import { Button, Table, Modal, InputNumber, Progress } from 'antd'
import { EditableCell, EditableFormRow } from './Editable'
import QuestionTable from './QuestionTable'
import { reject } from 'lodash'
import axios from 'axios'
import { timeParser } from '../utils'
export default class StudentTable extends React.Component {
  columns
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'username'
      },
      {
        title: 'Password',
        dataIndex: 'password',
        editable: true
      },
      {
        title: 'Progress',
        dataIndex: 'progress',
        render: d => <Progress percent={d} showInfo={false} />,
        width: '60%'
      },
      {
        title: 'Time Left',
        dataIndex: 'time',
        render: text => timeParser(text)
      },
      {
        title: ' ',
        render: row => (
          <Button onClick={e => this.handleDelete(row)} type='danger'>
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

  handleDelete = ({ username }) => {
    axios
      .post('http://localhost:3000/api/faculty/removestudent', {
        username
      })
      .then(res => {
        if (res.data.success == true) {
          this.setState({
            dataSource: reject(this.state.dataSource, { username })
          })
        }
      })
  }

  handleAdd = () => {
    let { n: number } = this.state
    let { testID } = this.props
    this.setState({ confirmLoading: true }, () => {
      axios
        .post('http://localhost:3000/api/faculty/addstudent', {
          testID,
          number
        })
        .then(res => {
          if (res.data.success == true) {
            this.fetchStudents('m')
          }
        })
    })
  }

  handleSave = (_val, { username }, { password }) => {
    axios
      .post('http://localhost:3000/api/faculty/updatepassword', {
        username,
        password
      })
      .then(res => {
        if (res.data.success == true) {
          this.setState({
            dataSource: this.state.dataSource.map(d =>
              d.username === username ? { ...d, password } : d
            )
          })
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
  fetchStudents = m => {
    let { testID } = this.props
    axios
      .get('http://localhost:3000/api/faculty/reports/' + testID)
      .then(res => {
        if (res.data.success) {
          this.setState({
            dataSource: res.data.reports,
            confirmLoading: m ? false : this.state.confirmLoading,
            visible: m ? false : this.state.visible
          })
        }
      })
  }
  componentDidMount () {
    this.fetchStudents()
    this.setState({
      poll: setInterval(() => {
        this.fetchStudents()
      }, 1000)
    })
  }
  componentWillUnmount () {
    this.setState({ poll: clearInterval(this.state.poll) })
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
          Add students
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
            expandedRowRender={record => (
              <QuestionTable
                dataSource={record.questions}
                label={this.props.testID}
              />
            )}
          />
        )}
      </div>
    )
  }
}
