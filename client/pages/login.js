import React, { Component } from "react";
import Layout from "../src/Components/Layout";
import { connect } from "react-redux";
import actions from "../redux/actions";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import withUnAuth from "../utils/auth/withUnAuth";
import { withRouter } from "next/router";
import Link from "next/link";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class Login extends Component {
  render() {
    const onFinish = (values) => {
      let body = {
        email: values.email,
        password: values.password,
      };

      let redirectUrl = this.props.router.query.redirectUrl
      this.props.authenticate(body, "signin", redirectUrl);
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 18, marginRight: 10 }} spin />
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
                    initialValue="Tek@gmail.com"
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
                    initialValue="helloworld1"
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
                      <Button  disabled={this.props.authentication.loading} htmlType="submit" className="secondary">
                        {this.props.authentication.loading && <Spin indicator={antIcon} />} Login Now
                      </Button>
                      <Button className="no-color"><Link href="/register">Create Account</Link></Button>
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

export default withUnAuth(connect((state) => state, actions)(withRouter(Login)));
