import React, { Component } from 'react';
import axios from 'axios';
import LoadScreen from './LoadScreen';
import { Row, Col } from 'antd';

export default class Report extends Component {
  state = {};
  componentDidMount() {
    let { tid } = this.props;
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
                        branch: r.branch,
                      })
                      .then(result => {
                        resolve({
                          correct: result.data.a,
                          your: q.answer,
                          status: result.data.a == q.answer,
                        });
                      });
                  });
                })
              ).then(res => {
                let score = 0,
                  max = res.length;
                res.map(a => {
                  if (a.status) {
                    score++;
                  }
                });
                resolve({ result: res, username: r.username, score, max });
              });
            });
          })
        ).then(res => {
          this.setState({ report: res });
        });
      }
    });
  }

  render() {
    let { report } = this.state;
    let shape = {
      height: '40px',
      width: '40px',
      border: '1px solid #fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    };
    if (report) {
      return (
        <div>
          {report.map(r => (
            <div>
              {r.username}, {r.score}/{r.max}
              <div style={{ display: 'flex' }}>
                {r.result.map(a => (
                  <div
                    style={
                      a.status
                        ? { ...shape, background: '#00ff00' }
                        : { ...shape, background: '#ff0000' }
                    }
                  >
                    {!a.status && a.your == ''
                      ? 'N/A'
                      : `${a.your}: ${a.correct}`}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return <LoadScreen />;
  }
}
