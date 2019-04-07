import React from 'react'
import { EditableCell, EditableFormRow } from './Editable'
import { Table, Popconfirm } from 'antd'

export default class QuestionTable extends React.Component {
  cols
  constructor (props) {
    super(props)
    this.cols = [
      {
        title: 'Question Number',
        dataIndex: 'n',
        width: '80%',
        render: (text, record, i) =>
          `Question ${i + 1} (${text} in the database)`
      },
      {
        title: 'Current Answer',
        dataIndex: 'answer',
        render: text => (text == '' ? 'Not yet attempted' : text)
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
    const { dataSource, testID } = this.props
    return (
      <div>
        <Table
          className='question-table'
          components={this.components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={this.columns()}
        />
      </div>
    )
  }
}
