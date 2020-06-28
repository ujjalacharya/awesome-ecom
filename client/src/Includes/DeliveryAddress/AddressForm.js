import React, { Component } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 24 },
    sm: { span: 16 },
  },
};

class AddressForm extends Component {
  state = {};

  render() {
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );

    return (
      <div className="address-form">
        <div className="add-title">ADD NEW ADDRESS</div>
        <Form
          {...formItemLayout}
          initialValues={{
            prefix: "86",
          }}
        >
          <Row gutter={15}>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input className="classInp" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  className="classInp"
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                label="Zip Code"
                name="zipcode"
                rules={[{ required: true, message: "Please input zip code!" }]}
              >
                <Input className="classInp" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!",
                    whitespace: true,
                  },
                ]}
              >
                <Input className="classInp" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                label="Area"
                name="area"
                rules={[
                  {
                    required: true,
                    message: "Please input your Area!",
                    whitespace: true,
                  },
                ]}
              >
                <Input className="classInp" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input your City!",
                    whitespace: true,
                  },
                ]}
              >
                <Input className="classInp" />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="save-address">
          <Button className="btn">Save</Button>
        </div>
      </div>
    );
  }
}

export default AddressForm;
