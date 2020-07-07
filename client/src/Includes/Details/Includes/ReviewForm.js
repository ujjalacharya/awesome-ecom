import React, { Component } from "react";
import { Form, Input, Button, Rate  } from "antd";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { withRouter } from "next/router";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ReviewsForm extends Component {
  formRef = React.createRef();

  onFinish = (values) => {
    this.props.postReviews(this.props.router.query.slug, values)
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <div className="reviews-form">
        <div className="title">ADD A REVIEW</div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          ref={this.formRef}
        >
            <Form.Item
            label="Rating"
            name="star"
            rules={[{ required: true, message: "Please give stars!" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Please enter you comment!" }]}
          >
            <Input.TextArea rows={4}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(ReviewsForm));
