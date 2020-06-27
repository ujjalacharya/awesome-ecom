import React, { Component } from "react";
import { Form, Input, Button, Rate  } from "antd";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ReviewsForm extends Component {
  onFinish = (values) => {
  };

  onFinishFailed = (errorInfo) => {
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
          onFinishFailed={this.onFinishFailed}
        >
            <Form.Item
            label="Rating"
            name="Rating"
            rules={[{ required: true, message: "Please give stars!" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Introduction"
            name="introduction"
            rules={[{ required: true, message: "Please enter you review!" }]}
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

export default ReviewsForm;
