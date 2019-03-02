import React from 'react'
import {
  Input,
  Button,
  Table,
  Popconfirm,
  Form,
  Row,
  Col,
  Modal,
  InputNumber,
  Progress
} from 'antd'
const FormItem = Form.Item
const EditableContext = React.createContext(undefined)

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: false
  }
  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = () => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  render () {
    const { editing } = this.state
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className='editable-cell-value-wrap'
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              )
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    )
  }
}
class SessionTable extends React.Component {
  cols
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
        dataIndex: 'operation',
        render: (text, record) =>
          this.props.dataSource.length >= 1 ? (
            <Popconfirm
              title='Sure to reassign?'
              onConfirm={() =>
                this.props.handleDelete(record.key, this.props.label)
              }
            >
              <a href='javascript:;'>Reassign</a>
            </Popconfirm>
          ) : null
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
          title: col.title,
          handleSave: row => {
            this.props.handleSave(row, this.props.label)
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
  render () {
    const { dataSource, label } = this.props
    return (
      <div>
        <Row gutter={16}>
          <Col md={18}>
            <Input placeholder='Basic usage' />
          </Col>
          <Col md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='primary' style={{ marginBottom: 16 }}>
              Change Password
            </Button>
          </Col>
        </Row>
        <Table
        className='question-table'
          components={this.components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={this.columns()}
        />
        <Row type='flex' justify='end'>
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => this.props.handleDelete(this.props.recKey)}
          >
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </Row>
      </div>
    )
  }
}
export default class StudentTable extends React.Component {
  columns
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'name',
        editable: true
      },
      {
        title: 'Password',
        dataIndex: 'pass',
        editable: true
      },
      {
        title: 'Progress',
        dataIndex: 'progress',
        render: d => <Progress percent={d} showInfo={false} />,
        width: '60%'
      },
      {
        title: ' ',
        render: e => <Button type='danger' >Cancel</Button>,

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

  handleDelete = key => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }

  handleAdd = () => {
    let { count, dataSource, sessionSource, n } = this.state
    if (n > 0) {
      this.setState(
        {
          confirmLoading: true
        },
        () => {
          for (let j = 1; j <= n; j++, count++) {
            const newData = {
              key: count,
              name: `Student ${j}`,
              pass: Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5),
              progress: 35
            }

            sessionSource.push([])
            for (let i = 0; i < 100; i++) {
              sessionSource[sessionSource.length - 1].push({
                key: 'child' + (sessionSource.length - 1) + i,
                name: `Question ${i}`
              })
            }
            dataSource.push(newData)
          }
          this.setState(
            {
              dataSource,
              count,
              sessionSource
            },
            () => {
              this.setState({ visible: false, confirmLoading: false })
            }
          )
        }
      )
    }
  }

  handleSave = row => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    this.setState({ dataSource: newData })
  }

  handleSessionDelete = (row, key) => {
    let { sessionSource } = this.state
    sessionSource[key] = sessionSource[key].filter(item => item.key !== row)
    this.setState({
      sessionSource
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
  render () {
    const { dataSource, sessionSource } = this.state
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
          title='Enter the number of students you want to add'
          visible={this.state.visible}
          onOk={this.handleAdd}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <InputNumber value={this.state.n} onChange={this.onInputChange} />
        </Modal>
      
        {dataSource.length > 0 && <Table
        className='student-table'
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          expandedRowRender={(a, key) => (
            <SessionTable
              dataSource={sessionSource[key]}
              handleAdd={this.handleSessionAdd}
              handleDelete={this.handleDelete}
              handleSave={this.handleSessionSave}
              label={key}
              recKey={a.key}
            />
          )}
        />}
      </div>
    )
  }
}
