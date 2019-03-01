import React from 'react'
import history from './history'
import { Icon, Card, Statistic } from 'antd'
import axios from 'axios'

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

  Data = () => {
    axios
      .get('http://localhost:3000/api/createTest', {
        branch,
        course,
        totQues,
        totTime
      })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    let { testID, branch, course, time, questions } = this.props
    return (
      <Card
        hoverable='true'
        bordered='false'
        title={testID}
        onClick={() => {
          history.push('/test/' + testID)
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
}

export default AdminCard
