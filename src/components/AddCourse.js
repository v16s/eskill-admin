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
  Progress,
  Layout
} from 'antd'
import CourseTable from './StudentTable';
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
      
        <Table
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
class Course extends React.Component {
  cols
  constructor (props) {
    super(props)
    this.state = {
      sessionCount: 0,
      sessionSource: [],
      visible: false,
      confirmLoading: false
    }
    this.cols = [
      {
        title: 'Course',
        dataIndex: 'name',
        width: '80%'
      },
      {
        title: ' ',
        render: e =>  <Button type='danger'>Delete</Button>
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
  handleAdd = () => {
    let { sessionSource } = this.state
    { 
      this.setState(
        {
          confirmLoading: true
        },
        () => {
            sessionSource.push([])
            for (let i = 0; i < 100; i++) {
              sessionSource[sessionSource.length - 1].push({
                key: 'child' + (sessionSource.length - 1) + i,
                name: `Question ${i}`
              })
            }
          this.setState(
            {
              sessionSource,
            },
            () => {
              this.setState({ visible: false, confirmLoading: false })
            }
          )
        }
      )
  }}
  render () {
    const { dataSource,sessionSource, label } = this.props
    return (
      <Layout
      onClick={this.handleAdd}>
      <div>
        <Table
          components={this.components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={this.columns()}
          expandedRowRender={(a, key) => (
            <SessionTable
              dataSource={sessionSource[key]}
              label={key}
              recKey={a.key}
            />
          )}
          
        />
       </div> 
      </Layout>
    )
  }
}
class AddCourse extends React.Component {
  columns
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'Branch',
        dataIndex: 'name',
        editable: false
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
      dataSource: [{
        key: 1,
        name: `ECE`,
        progress: 35
      },
      { key: 2,
        name: `CSE`,
        progress: 35},
      { key: 3,
        name: `MECH`,
        progress: 35}],
      sessionCount: 0,
      sessionSource: [],
      courses:[],
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
    let { count, dataSource,courses, n } = this.state
    { let e =  3
      if (e > 0) {
      this.setState(
        {
          confirmLoading: true
        },
        () => {
            courses.push([])
            for (let i = 1; i < 8; i++) {
              courses[courses.length - 1].push({
                key: 'child' + (courses.length - 1) + i,
                name: `Course ${i}`
              })
            }
          this.setState(
            {
              dataSource,
              count,
              courses
            },
            () => {
              this.setState({ visible: false, confirmLoading: false })
            }
          )
        }
      )
    }
  }}

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
  handleCourseDelete = (row, key) => {
    let { courses} = this.state
    courses[key] = courses[key].filter(item => item.key !== row)
    this.setState({
      courses
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
    const { dataSource, sessionSource,courses } = this.state
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
        <Layout
        onLoad={this.handleAdd}
        >
        <Form>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          expandedRowRender={(a, key) => (
            <Course
              dataSource={courses[key]}
              label={key}
              recKey={a.key}
            />
          )}
        />
        </Form>
        </Layout>
      </div>
    )
  }
}
export default AddCourse