import React from 'react'
import history from './history'
import { Button, Card, Statistic } from 'antd'

class AdminCard extends React.Component {
  state = { time: undefined }
  componentDidMount () {}
  constructor () {
    super()
    this.state = {
      branch: '',
      course: '',
      totQues: '',
      totTime: ''
    }
  }

  render () {
    let { testID, branch, course, time, questions, status } = this.props
    time = `${parseInt(time / 3600)}:${parseInt((time % 3600) / 60)}:${parseInt(
      (time % 3600) % 60
    )}`
    if (status == 0) {
      return (
        <Card
          hoverable='true'
          bordered='false'
          title={testID}
          onClick={() => {
            history.push(`/test/${branch}/${course}/${testID}`)
          }}
          style={{ marginTop: 16 }}
        >
          <Statistic title='Branch' value={branch} />
          <Statistic title='Course' value={course} />
          <Statistic title='Duration' value={time} />
          <Statistic title='Questions' value={questions} />
        </Card>
      )
    }
    return (
      <Card
        hoverable={false}
        bordered='false'
        title={testID}
        style={{
          marginTop: 16,
          backgroundColor: `#001325`,
          borderColor: '#001325'
        }}
      >
        <Statistic title='Branch' value={branch} />
        <Statistic title='Course' value={course} />
        <Statistic title='Duration' value={'Finished'} />
        <Button
          style={{ marginTop: 10, width: '100%' }}
          type='primary'
          size='large'
        >
          Print Reports
        </Button>
      </Card>
    )
  }
}

export default AdminCard
