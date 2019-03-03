import React from 'react'
import BranchTable from './BranchTable'

import { Form, Input, Button, Card, Row, Col } from 'antd'
class AddCourse extends React.Component {
  state = {}
  render () {
    return (
      <div>
        <style jsx global>{/* CSS */ `
          .ant-input-affix-wrapper .ant-input-search-icon,
          .ant-input-affix-wrapper .ant-input-suffix {
            color: #1890ff !important;
          }
          .ant-input,
          .ant-input:focus,
          .ant-input:hover {
            background-color: #001f3d !important;
            border-color: transparent !important;
            color: #fff !important;
          }
          internal-autofill-previewed,
          input:-internal-autofill-selected,
          textarea:-internal-autofill-previewed,
          textarea:-internal-autofill-selected,
          select:-internal-autofill-previewed,
          select:-internal-autofill-selected {
            box-shadow: inset 0 0 0px 9999px #00284f;
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
          .ant-card {
            background-color: #001f3d;
            color: #fff;
            border-color: #001f3d;
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
            .ant-pagination-disabled a:hover {
              color: #aaa;
              border-color: #aaa;
            }
            & .ant-card-head {
              border-color: transparent;
              color: #9ec7ed;
            }
            & .student-table .ant-table-bordered table {
              border-color: transparent;
              td,
              tr > td {
                border-color: transparent;
                background-color: rgb(0, 13, 25);
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
                .student-table .ant-table-bordered table {
                  border-color: transparent;
                  td,
                  tr > td {
                    border-color: transparent;
                    background-color: rgb(0, 13, 25);
                    color: #fff;
                  }
                  .ant-table-row-expand-icon {
                    background: transparent;
                  }
                  th {
                    background-color: #001f3d;
                    border-color: transparent;
                    color: #fff;
                  }
                }
              }
            }
          }
        `}</style>
        <Card style={{ width: '100%' }} title='Branches'>
          <BranchTable />
        </Card>
      </div>
    )
  }
}

export default AddCourse
