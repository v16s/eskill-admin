import React, { Component } from 'react'
import { history, StudentTable } from 'components'
import { Form, Input, Button, Card, Row, Col } from 'antd'
const Search = Input.Search

class EditTest extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div>
        <style jsx global>{`
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
        `}</style>
        <div>
          <Search
            placeholder='input search text'
            onSearch={value => console.log(value)}
            style={{ width: '100%' }}
          />
        </div>
        <div
          style={{
            marginTop: 30
          }}
        >
          <Form
            onSubmit={this.onSubmit}
            className='login-form'
            style={{ width: '100%' }}
          >
            <Form.Item>
              <Card style={{ width: '100%' }} title='Students Assigned'>
                <StudentTable />
              </Card>
            </Form.Item>
            <Form.Item>
              <Card
                style={{ width: '100%' }}
                title='Faculties Assigned'
                extra={
                  <div style={{ display: 'flex' }}>
                    <Button
                      type='primary'
                      onClick={() => {
                        history.push('/studentregister')
                      }}
                      style={{ width: '100%' }}
                    >
                      Add New Faculty
                    </Button>
                  </div>
                }
              >
                <StudentTable />
              </Card>
            </Form.Item>
            <Form.Item>
              <Card>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}
                >
                  <Row gutter={16} style={{ width: '100%' }}>
                    <Col md={4}>Test ID</Col>
                    <Col md={4}>Test Name</Col>{' '}
                  </Row>
                  <Button size='large' type='danger'>
                    Abort
                  </Button>
                </div>
              </Card>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(EditTest)
