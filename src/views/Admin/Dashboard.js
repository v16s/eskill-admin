import React, { Component } from 'react'
import { AdminCard, history } from 'components'
import { chunk } from 'lodash'
import axios from 'axios'
import { Input, Row, Col, Card, Icon } from 'antd'
const { Search } = Input
export default class Dashboard extends Component {
  constructor () {
    super()
    this.state = { tests: [] }
  }
  componentDidMount () {
    axios
      .get('http://localhost:3000/api/admin/tests')
      .then(res => {
        this.setState({ tests: res.data.tests })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    // if(this.props.level === 1){
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
          .ant-card {
            max-width: 350px;
            height: 350px;
            width: 100%;
            background-color: #001f3d !important;
            color: #fff !important;
            border-color: #001f3d !important;
            & .ant-statistic-title {
              color: #4a5c6d !important;
              margin-bottom: 0 !important;
            }
            & .ant-statistic-content {
              color: #9ec7ed !important;
              margin-bottom: 8px !important;
            }
            & .ant-card-head {
              border-color: transparent !important;
              color: #9ec7ed !important;
            }
          }
        `}</style>
        <Search
          placeholder='input search text'
          onSearch={value => console.log(value)}
          style={{ width: '100%' }}
        />
        {chunk([0, ...this.state.tests], 3).map((r, i) => (
          <Row key={'row-' + i} gutter={16} type='flex'>
            {r.map(c => (
              <Col
                key={'col' + c}
                md={8}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                {c === 0 ? (
                  <Card
                    hoverable='true'
                    bordered='false'
                    onClick={() => {
                      history.push('/createtest')
                    }}
                    style={{
                      marginTop: 16,
                      height: '350px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexGrow: '1'
                    }}
                  >
                    <Icon type='plus' style={{ fontSize: 45 }} />
                  </Card>
                ) : (
                  <AdminCard {...c} />
                )}
              </Col>
            ))}
          </Row>
        ))}
      </div>
    )
    // }
  }
}
