import React, { Component } from "react";
import axios from "axios";
import Doc from "./DocService";
import PdfContainer from "./PdfContainer";
import LoadScreen from "./LoadScreen";
import { Row, Col, Card, Table, Progress, Button, Modal, Tooltip } from "antd";

export default class Report extends Component {
  constructor() {
    super();
    this.state = {
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
    let e = 0,
      f = 0;
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
    let c = 0,
      d = 0,
      e = 0,
      f = 0;

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
                      title="Results"
                      hoverable="true"
                    >
                      <Tooltip title="Percentage">
                        {console.log(
                          report.map(r => (r.score >= r.max / 2 ? ++d : ++f))
                        )}
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
                        <Progress
                          style={{ alignContent: "right" }}
                          percent={(d * 100) / c}
                          type="circle"
                        />
                      </Tooltip>
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
