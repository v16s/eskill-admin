import React, { Component } from 'react'
import axios from 'axios'
import LoadScreen from './LoadScreen'

export default class Report extends Component {
  state = {}
  componentDidMount () {
    let { tid } = this.props
    axios.get('http://localhost:3000/api/faculty/reports/' + tid).then(res => {
      if (res.data.success) {
        Promise.all(
          res.data.reports.map(r => {
            return new Promise(resolve => {
              Promise.all(
                r.questions.map(q => {
                  return new Promise(resolve => {
                    axios
                      .post('http://localhost:3000/api/faculty/answer', {
                        n: q.n,
                        course: r.course,
                        branch: r.branch
                      })
                      .then(result => {
                        resolve({
                          correct: result.data.a,
                          your: q.answer,
                          status: result.data.a == q.answer
                        })
                      })
                  })
                })
              ).then(res => {
                resolve({ result: res, username: r.username })
              })
            })
          })
        ).then(res => {
          this.setState({ report: res })
        })
      }
    })
  }

  render () {
    let { report } = this.state
    if (report) {
      return (
        <div>
          {report.map(r => (
            <div>
              {r.username}
              {r.result.map(a => (
                <div>
                  {a.status ? (
                    <p>RIGHT!</p>
                  ) : (
                    <div>
                      <p>WRONG!</p>
                      <p>Student's answer: {a.your}</p>
                      <p>Corret answer: {a.correct}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }
    return <LoadScreen />
  }
}
