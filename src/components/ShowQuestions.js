import React from 'react'
import axios from 'axios'
import { Form, Input, Icon, Select, Upload, InputNumber, Table } from 'antd'
import { EditableCell, EditableFormRow } from './Editable'
import QuestionTable from './QuestionTable'
const { Option } = Select
const InputGroup = Input.Group
const { TextArea } = Input

class Qtable extends React.Component {
  constructor (props) {
    super(props)
    this.cols = [
      {
        title: 'Question',
        dataIndex: 'name',
        width: '80%'
      },
      {
        title: 'operation',
        dataIndex: 'operation'
      }
    ]
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
          title: col.title
        })
      }
    })
  components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  }
  render () {
    const { dataSource, testID } = this.props
    return (
      <div>
        <Table
          className='custom-table'
          components={this.components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={[]}
          columns={this.columns()}
        />
      </div>
    )
  }
}

export default class ShowQuestions extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      course: '',
      branch: '',
      session: '',
      questions: [],
      dataSource: []
    }
  }
  componentDidMount () {
    const dataSource = this.state
    axios.get('http://localhost:3000/api/global/branches').then(res => {
      console.log(res.data)
      this.setState({ dataSource: res.data.branches })
    })
  }
  onBranchChange = e => {
    this.setState({ branch: e })
  }
  onSelectChange = e => {
    this.setState({ course: e })
  }

  render () {
    const { course, branch, session, questions } = this.state

    const columns = [
      {
        title: 'Session',
        dataIndex: 'session',
        width: '80%',
        key: 'session',
        render: text => <a href='javascript:;'>{text}</a>
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href='javascript:;'>Delete</a>
          </span>
        )
      }
    ]
    const data = [
      {
        key: '1',
        session: 'Session 1'
      },
      {
        key: '2',
        session: 'Session 2'
      }
    ]
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
          .custom-table .ant .custom-form .ant-select-arrow {
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
          style={{ padding: 0 }}
          onSubmit={this.onSubmit}
          className='custom-form'
        >
          <Form.Item label='Branch'>
            <Select
              style={{ width: 400 }}
              defaultValue={'Choose Branch...'}
              name='branch'
              onChange={this.onBranchChange}
              value={branch}
              size='large'
            />
          </Form.Item>

          {/* {this.state.dataSource.map(b => (
          <Option key={b.name} value={b.name}>
            {b.name}
          </Option>
        ))} */}

          <Form.Item label='Course'>
            <Select
              compact
              style={{ width: 400 }}
              defaultValue={'Choose Course...'}
              name='course'
              onChange={this.onSelectChange}
              size='large'
            >
              {/* {this.state.dataSource.map(function (b) {
              if (b.name == branch) {
                return b.courses.map(c => (
                  <Option key={c.name} value={c.name}>
                    {c.name}
                  </Option>
                ))
              }
            })} */}
            </Select>
          </Form.Item>
          <Form.Item label='Session Table' width='100%'>
            <Table
              className='custom-table'
              columns={columns}
              dataSource={data}
              expandedRowRender={record => <Qtable dataSource='' label='' />}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
