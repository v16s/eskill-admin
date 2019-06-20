import React, { Component } from "react";
import axios from "axios";
import Doc from "./DocService";
import PdfContainer from "./PdfContainer";
import LoadScreen from "./LoadScreen";
import { Row, Col, Card, Table, Progress, Button, Modal, Tooltip } from "antd";
import {Chart,Geom,Axis,} from "bizcharts";

export default class Report extends Component {
  constructor() {
    super();
    this.state = {
      id:' ',
      tot: "0",
      totscore: "0",
    };
  }
  handleCancel = () => {
    this.setState({ visible: false });
  };
  modal = () => {
    this.setState({ visible: true });
  };

  createPdf = html => Doc.createPdf(html);
  componentDidMount() {
    let { tid } = this.props;
    axios.get("http://localhost:3000/api/faculty/reports/" + tid).then(res => {
      if (res.data.success) {
        Promise.all(
          res.data.reports.map(r => {
            return new Promise(resolve => {
              Promise.all(
                r.questions.map(q => {
                  return new Promise(resolve => {
                    axios
                      .post("http://localhost:3000/api/faculty/answer", {
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

    const columns = [
      {
        title: "S.No",
        dataIndex: "sno",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Name",
        dataIndex: "name",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Progress",
        dataIndex: "score",
        render: progress => <Progress percent={progress} size="small" />,
      },
      {
        title: "Score",
        dataIndex: "score",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Maximum",
        dataIndex: "max",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: text => <a href="javascript:;">{text}</a>,
      },

      // {
      //   title: 'Questions',
      //   render: (report) => ((report =>
      //     <div>
      //       <div style={{ display: 'flex' }}>
      //         {report.result.map(a => (
      //           <div
      //             style={
      //               a.status
      //                 ? { ...shape, background: '#00ff00' }
      //                 : { ...shape, background: '#ff0000' }
      //             }
      //           >
      //           </div>
      //         ))}
      //         <br />
      //       </div>
      //     </div>
      //   )),
      // },
    ];
    const col = [
      {
        title: "S.No",
        dataIndex: "sno",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Name",
        dataIndex: "name",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Score",
        dataIndex: "score",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Out Of",
        dataIndex: "max",
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: text => <a href="javascript:;">{text}</a>,
      },
    ];

    let shape = {
      width: "13px",
      height: "13px",
      border: "1px solid #fff",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      marginRight: "10px",
      alignItems: "center",
      color: "#fff",
    };
    const data = [
      { year: "1991", value: 3 },
      { year: "1992", value: 4 },
      { year: "1993", value: 3.5 },
      { year: "1994", value: 5 },
      { year: "1995", value: 4.9 },
      { year: "1996", value: 6 },
      { year: "1997", value: 7 },
      { year: "1998", value: 9 },
      { year: "1999", value: 13 }
    ];
    const cols = {
      'value': { min: 0 },
      'year': {range: [ 0 , 1] }
    };
    let c = 0,
      d = 0,
      e = 0,
      f = 0;
      let { tid, branch, course} = this.props
    if (report) {
      return (
        <div style={{ color: "white" }}>
          <Table
            columns={columns}
            dataSource={report.map(r => ({
              sno: ++c,
              name: r.username,
              score: r.score,
              max: r.max,
              status: r.score >= r.max / 2 ? "Pass" : "Fail",
            }))}
          />
          <Button
            onClick={this.modal}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Print
          </Button>
          <Modal
            visible={this.state.visible}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            title={null}
            closable={true}
            footer={null}
          >
            <React.Fragment>
              <PdfContainer createPdf={this.createPdf}>
                <React.Fragment>
                  <div style={{ color: "white" }}>
                    <Card
                      style={{ width: "100%" }}
                      title={"Results : "+tid}
                      hoverable="true"
                    ><Row gutter={16}>
                      <p> </p>
                      <Col span={10}>
                        <p>
                         {' Branch: '+branch}
                         </p>
                         </Col>
                         <Col span={13}>
                         <p>
                         {"Course: "+course}
                        </p>
                        </Col>
                       </Row> 
                      {console.log(
                          report.map(r => (r.score >= r.max / 2 ? ++d : ++f))
                        )}

                      <Col >
                      <Card type='inner'>
                        <p> </p>
                        <p>
                          Total Number of Students Passed:
                          {d}
                        </p>
                        <p>
                          Total Number of Students failed:
                          {f}
                        </p>
                        <p>{"Total Number of Students :" + c}</p>
                        </Card>
                        </Col>
                        <Col >
                        <Card type='inner'>
                        <Chart height={400} data={data} scale={cols} forceFit>
                         <Axis name="year" />
                         <Axis name="value" />
                         <Tooltip crosshairs={{type : "y"}}/>
                         <Geom type="line" position="year*value" size={2} />
                         <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
                        </Chart>
                        </Card> 
                        </Col>
                    </Card>
                    <Table
                      columns={col}
                      dataSource={report.map(r => ({
                        sno: ++d,
                        name: r.username,
                        score: r.score,
                        max: r.max,
                        status: r.score >= r.max / 2 ? "Pass" : "Fail",
                      }))}
                    />
                  </div>
                </React.Fragment>
              </PdfContainer>
            </React.Fragment>
          </Modal>
        </div>
      );
    }
    return <LoadScreen />;
  }
}
// {{report.map(r => (
//   <div>
//     Name: {r.username}, Score: {r.score}/{r.max}
//     <div style={{ display: 'flex' }}>
//       {r.result.map(a => (
//         <div
//           style={
//             a.status
//               ? { ...shape, background: '#00ff00' }
//               : { ...shape, background: '#ff0000' }
//           }
//         >
//           {/* <div>
//             {!a.status && a.your == ''
//               ? 'N/A'
//               : `Your Answer :${a.your}
//             Correct Answer : ${a.correct}`}
//           </div> */}
//         </div>
//       ))}
//       <br />
//     </div>
//   </div>
// ))}}
