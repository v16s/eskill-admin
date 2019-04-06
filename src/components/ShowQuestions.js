import React from 'react'
import axios from 'axios'
import { Form, Select, Table, Button } from 'antd'
import EditQuestions from './EditQuestions'

const { Option } = Select

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
      this.setState({ dataSource: res.data.branches })
    })
  }
  onBranchChange = e => {
    this.setState({ branch: e })
  }
  onSelectChange = e => {
    this.setState({ course: e }, () => {
      axios
        .get(
          `http://localhost:3000/api/coordinator/questions/${
            this.state.branch
          }/${e}`
        )
        .then(res => {
          if (res.data.success) {
            this.setState({ questions: res.data.questions })
          }
        })
    })
  }

  showModal = record => {
    this.setState({
      visible: true,
      current: record
    })
  }

  handleCancel = e => {
    if (e) {
      axios
        .get(
          `http://localhost:3000/api/coordinator/questions/${
            this.state.branch
          }/${this.state.course}`
        )
        .then(res => {
          if (res.data.success) {
            this.setState({
              questions: res.data.questions,
              visible: false,
              current: undefined
            })
          }
        })
    } else {
      this.setState({
        visible: false,
        current: undefined
      })
    }
  }

  onEdit = () => {}

  render () {
    const { course, branch, session, questions } = this.state

    const dataset = ['Question 1', 'Question 2', 'Question 3', 'Question 4']
    const { title, opt1, opt2, opt3, opt4 } = this.state
    const columns = [
      {
        title: '',
        dataIndex: 'questions',
        width: '10%',
        render: (text, record) => (
          <div>
            <Button
              size='small'
              type='primary'
              onClick={e => this.showModal(record)}
            >
              View Question
            </Button>
          </div>
        )
      },
      {
        title: 'Title',
        dataIndex: 'title',
        width: '70%',
        key: 'title'
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
    const data = this.state.questions
    return (
      <div>
        <style jsx global>{/* CSS */ `
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
          .ant-list {
            color: #fff;
            &-bordered {
              border-color: #1890ff;
            }
            &-bordered &-item {
              border-color: #000d19;
            }
            &-item {
              &:hover {
                cursor: pointer;
              }
              background-color: #1890ff;
            }
          }
          .custom-form .ant-form-item-label label {
            color: #ddd !important;
          }
          .ant-pagination-item-link,
          .ant-pagination-item,
          .ant-pagination-prev,
          .ant-pagination-next,
          .ant-pagination-jump-prev,
          .ant-pagination-jump-next {
            background-color: transparent;
            a {
              color: #fff;
            }
          }
          .ant-pagination-jump-prev
            .ant-pagination-item-container
            .ant-pagination-item-ellipsis,
          .ant-pagination-jump-next
            .ant-pagination-item-container
            .ant-pagination-item-ellipsis {
            color: #fff;
          }
          .ant-pagination-disabled a,
          .ant-pagination-disabled:hover a,
          .ant-pagination-disabled:focus a,
          .ant-pagination-disabled .ant-pagination-item-link,
          .ant-pagination-disabled:hover .ant-pagination-item-link,
          .ant-pagination-disabled:focus .ant-pagination-item-link {
            background-color: transparent;

            color: #aaa;
            border-color: #aaa;
          }
          .student-table table {
            border-color: transparent;

            td,
            tr > td,
            tr:hover,
            .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
              border-color: transparent;
              background-color: rgb(0, 13, 25);

              background: rgb(0, 13, 25);
              color: #fff;
            }
            .ant-table-row-expand-icon {
              background: transparent;
            }
            th {
              background-color: #001529;
              border-color: transparent;
              color: #fff;
            }
            .question-table table {
              td,
              tr > td {
                background-color: #001529;
              }
              th {
                background-color: #001f3d;
              }
            }
          }
          .ant-modal {
            &-content {
              background-color: #000d19;
            }
            &-footer {
              border-color: transparent;
            }
            &-body {
              border-color: transparent;
            }
            .ant-btn {
              background-color: #001f3d;
              border-color: #001f3d;
              color: #fff;
            }
            .ant-btn-primary.ant-btn {
              background-color: #1890ff;
              border-color: #1890ff;
            }
          }
          .ant-radio-button-wrapper {
            background-color: #00417f;
            border-color: #00417f;
            color: #fff;
          }
          .custom-form .ant-form-item-label label {
            color: #ddd !important;
          }
          .ant-upload.ant-upload-drag {
            background: #001f3d;
            border-color: #001f3d;
            color: #fff;
            p.ant-upload-text {
              color: #fff;
            }
          }
          .ant-radio-group-solid
            .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
          .ant-radio-group-solid
            .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
            background-color: #00db95;
            border-color: #00db95;
            .ant-input,
            .ant-input:focus,
            .ant-input:hover,
            .ant-select-arrow {
              background-color: #002d19 !important;
              border-color: transparent !important;
              color: #fff !important;
            }
          }
          .ant-radio-button-wrapper:first-child {
            border-left-color: transparent;
          }
        `}</style>
        {this.state.current && (
          <EditQuestions
            record={this.state.current}
            visible={this.state.visible}
            handleCancel={this.handleCancel}
          />
        )}
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
              value={branch || 'Choose Branch...'}
              size='large'
              style={{ width: '100%' }}
            >
              {this.state.dataSource.map(b => (
                <Option key={b.name} value={b.name}>
                  {b.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Course'>
            <Select
              compact
              style={{ width: 400 }}
              defaultValue={'Choose Course...'}
              name='course'
              onChange={this.onSelectChange}
              size='large'
              style={{ width: '100%' }}
            >
              {this.state.dataSource.map(function (b) {
                if (b.name == branch) {
                  return b.courses.map(c => (
                    <Option key={c.name} value={c.name}>
                      {c.name}
                    </Option>
                  ))
                }
              })}
            </Select>
          </Form.Item>
          {data.length > 0 && (
            <Form.Item label='Session Table' width='100%'>
              <Table
                className='student-table'
                columns={columns}
                dataSource={data}
              />
            </Form.Item>
          )}
        </Form>
      </div>
    )
  }
}
