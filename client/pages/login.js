import React, { Component } from "react";
import Layout from "../src/Components/Layout";
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
      console.log(this.props)
      let body = {
        email: values.email,
        password: values.password
      }
      this.props.authenticate(body, 'signin')
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <Layout title="Login">
        <div className="container">
          <div className="login-wrapper">
            <div className="welcome-illus">
              <img src="/images/welcome.png" />
            </div>
            <div className="login-right">
              <div className="login-title">
                <h1>Welcome!</h1>
                <p>To keep connected with us please login with your email</p>
              </div>
              <div className="login-form">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      autoComplete={false}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      autoComplete={false}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div className="rem-for">
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>

                      <a className="login-form-forgot" href="">
                        Forgot password?
                      </a>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <div className="login-create">
                      <Button htmlType="submit" className="secondary">
                        Login Now
                      </Button>
                      <Button className="no-color">Create Account</Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(
  state => state,
  actions
)(Login);
