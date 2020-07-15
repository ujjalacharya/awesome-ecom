import React, { Component } from "react";
import { getUserInfo, convertDateToCurrentTz } from "../../../../utils/common";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import Link from "next/link";
import { withRouter } from "next/router";
import _ from "lodash";
import { Form, Input, Button } from "antd";
import { Pagination } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class QA extends Component {
  formRef = React.createRef();
  state = {
    token: "",
    QAdetails: [],
    currentPage: 1
  };

  componentDidMount() {
    if (this.props.authentication?.token) {
      this.setState({
        token: this.props.authentication.token,
      });
    }

    if (!_.isEmpty(this.props.products.productQA)) {
      this.setState({
        QAdetails: this.props.products.productQA,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.products.productQA !== prevProps.products.productQA &&
      this.props.products.productQA
    ) {
      this.setState({
        QAdetails: this.props.products.productQA,
      });
    }
    if (
      this.props.products.postQnsResp !== prevProps.products.postQnsResp &&
      this.props.products.postQnsResp
    ) {
      this.props.getQandA(this.props.router.query.slug + "?page=1");
    }
  }

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
    this.props.getQandA(`${this.props.router.query.slug}?page=${page}`);
  };

  onFinish = (values) => {
    this.props.postQuestion(this.props.router.query.slug, values);
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <div className="q-a-tab">
        <h3>
          Questions about this product ({this.state.QAdetails?.QnA?.qna?.length}
          )
        </h3>
        {!this.state.token ? (
          <div className="not-logged-in">
            <Link href={`/login?origin=${this.props.router.asPath}`}>
              Login
            </Link>{" "}
            or <a>Register</a> to ask questions
          </div>
        ) : (
          <div className="ask-qns-form">
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              // onFinishFailed={onFinishFailed}
              ref={this.formRef}
            >
              <Form.Item
                // label="Username"
                name="question"
                rules={[
                  { required: true, message: "Please enter your question!" },
                ]}
              >
                <Input placeholder="Enter your question here" />
              </Form.Item>

              <Form.Item>
                <Button className="secondary" htmlType="submit">
                  Ask Question
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        <div className="qns-ans-section">
          {!this.state.token && (
            <div className="title">
              Questions answered by{" "}
              {this.props.products.productDetails?.soldBy?.shopName}
            </div>
          )}
          {this.state.QAdetails?.QnA?.qna?.map((qa, i) => {
            return (
              <div className="qns-details" key={i}>
                <div className="qns">
                  <span className="q-icon">
                    Q<span className="arrow-bottom"></span>
                  </span>
                  <span className="q-title">
                    <span className="q-text">{qa.question}</span>
                    <div className="user">
                      {qa.questionby.name} -{" "}
                      {convertDateToCurrentTz(qa.questionedDate)}
                    </div>
                  </span>
                </div>
                <div className="ans">
                  <span className="q-icon a-btn">
                    A<span className="arrow-bottom"></span>
                  </span>
                  <span className="q-title">
                    <span className="q-text">{qa.answer}</span>
                    <div className="user">
                      {qa.answerby.shopName} -{" "}
                      {convertDateToCurrentTz(qa.answeredDate)}
                    </div>
                  </span>
                </div>
              </div>
            );
          })}

          {_.isEmpty(this.state.QAdetails) && (
            <div>No questions. Ask the seller now about the products.</div>
          )}

          <Pagination
            pageSize={5}
            current = {this.state.currentPage}
            total={this.state.QAdetails?.totalCount}
            onChange={this.onChangePage}
            showLessItems = {true}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(QA));
