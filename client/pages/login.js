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
import { LoadingOutlined, FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
class Login extends Component {
  responseFacebook = (response) => {
    console.log(response);
  }

  responseGoogle = (response) => {
    window.addEventListener("message", ({ data }) => { JSON.parse(data); console.log(data) });
    console.log(response);
  }
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
                      <Button disabled={this.props.authentication.loading} htmlType="submit" className="primary">
                        {this.props.authentication.loading && <Spin indicator={antIcon} />} Login Now
                      </Button>
                      <Button disabled={this.props.authentication.loading} className="no-color"><Link href="/register">Create Account</Link></Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
              <div className="social-login-opt">
                <div id="or">OR</div>
                <div className="social-title">Sign in with</div>
                <div className="social-btn-cover">
                  <FacebookLogin
                    appId="207764167510635"
                    autoLoad={false}
                    fields="name,email,picture"
                    // onClick={componentClicked}
                    callback={this.responseFacebook}
                    render={renderProps => (
                      <Button
                        className="social-btn facebook"
                        onClick={renderProps.onClick}
                      >
                        <FacebookFilled /> Login With Facebook
                      </Button>
                    )}
                  />
                  <GoogleLogin
                    clientId="223562887361-6po823epv7ch9ivklm6d47kcpilt99b3.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                      <Button
                        className="social-btn google"
                        onClick={renderProps.onClick}
                      >
                        <img className="google-img" src="/images/google-icon.png" /> Login With Google
                      </Button>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withUnAuth(connect((state) => state, actions)(withRouter(Login)));
