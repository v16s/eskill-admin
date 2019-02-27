import React, { Component } from 'react'
import { AdminCard, history } from 'components'
import { chunk } from 'lodash'
import { Input, Row, Col, Card, Icon } from 'antd'
const { Search } = Input
export default class Dashboard extends Component {
  render () {
    // if(this.props.level === 1){
    return (
      <div>
        <Search
          placeholder='input search text'
          onSearch={value => console.log(value)}
          style={{ width: '100%' }}
        />
        {chunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3).map((r, i) => (
          <Row key={'row-' + i} gutter={16}>
            {r.map(c => (
              <Col key={'col' + c} md={8}>
                {c === 0 ? (
                  <Card
                    hoverable='true'
                    bordered='false'
                    onClick={() => {
                      history.push('/createtest')
                    }}
                    style={{
                      marginTop: 16,
                      height: 250,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Icon type='plus' style={{ fontSize: 45 }} />
                  </Card>
                ) : (
                  <AdminCard title={c} />
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
