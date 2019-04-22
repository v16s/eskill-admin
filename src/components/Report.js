import React, { Component } from 'react';
import axios from 'axios';
import LoadScreen from './LoadScreen';
import { Row, Col, Card, Table } from 'antd';

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
    const columns = [
      {
        title: 'S.No',
        dataIndex: 'sno',
        render: text => <a href='javascript:;'>{text}</a>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href='javascript:;'>{text}</a>,
      },
      {
        title: 'Score',
        dataIndex: 'score',
        render: text => <a href='javascript:;'>{text}</a>,
      },
      {
        title: 'Maximum',
        dataIndex: 'max',
        render: text => <a href='javascript:;'>{text}</a>,
      },
    ];
    const col = [
      {
        title: 'Question',
        dataIndex: 'question',
        render: text => <a href='javascript:;'>{text}</a>,
      },
      {
        title: 'Student Answer',
        dataIndex: 'sanswer',
        render: text => <a href='javascript:;'>{text}</a>,
      },
      {
        title: 'Correct Answer',
        dataIndex: 'canswer',
        render: text => <a href='javascript:;'>{text}</a>,
      },
    ];

    let { report } = this.state;
    const data = [];
    // // data.push(
    // report.map(r => ({
    //     // Name: {r.username}, Score: {r.score}/{r.max}
    //       sanswer:
    //       r.result.map(a => (
    //           !a.status && a.your == ''
    //             ?'N/A':a.your
    //       ))

    //   }))
    // )

    let shape = {
      height: '130px',
      width: '100px',
      border: '1px solid #fff',
      display: 'flex',
      justifyContent: 'center',
      marginRight: '10px',
      alignItems: 'center',
      color: '#fff',
    };
    let c = 1;
    if (report) {
      return (
        <div style={{ color: 'white' }}>
          <Table
            columns={columns}
            dataSource={report.map(r => ({
              sno: c++,
              name: r.username,
              score: r.score,
              max: r.max,
              //   sanswer:
              //  r.result.map(a =>(
              //   !a.status && a.your == ''
              //   ?'N/A'
              //   :a.your
              //  )),
              //  canswer:
              //  r.result.map(a =>(
              //   !a.status && a.your == ''
              //   ?'N/A'
              //   :a.correct

              //  ))
            }))}
          />
          {report.map(r => (
            <div>
              Name: {r.username}, Score: {r.score}/{r.max}
              <div style={{ display: 'flex' }}>
                {r.result.map(a => (
                  <Card
                    hoverable
                    style={
                      a.status
                        ? { ...shape, background: '#00ff00' }
                        : { ...shape, background: '#ff0000' }
                    }
                  >
                    <div>
                      {!a.status && a.your == ''
                        ? 'N/A'
                        : `Your Answer :${a.your}
                      Correct Answer : ${a.correct}`}
                    </div>
                  </Card>
                ))}
                <br />
              </div>
            </div>
          ))}
        </div>
      );
    }
    return <LoadScreen />;
  }
}
