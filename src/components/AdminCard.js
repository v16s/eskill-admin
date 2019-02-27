import React from 'react'
import history from './history'
import { Icon, Card, Button } from 'antd'
import axios from 'axios'
const { Meta } = Card

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
    let { title } = this.props
    return (
      <Card
        hoverable='true'
        bordered='false'
        title={'Test: ' + title}
        onClick={() => {
          history.push('/test/' + title)
        }}
        style={{ marginTop: 16, height: 250 }}
      >
        <Meta
          style={{ padding: '2px' }}
          title='No of students'
          description='20'
        />
        <Meta
          style={{ padding: '2px' }}
          title='No of teachers'
          description='30'
        />
        <Meta
          style={{ padding: '2px' }}
          title='Time remaining'
          description='30:12'
        />
      </Card>
    )
  }
}

export default AdminCard
