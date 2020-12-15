import React, { Component } from "react";
import Layout from "../src/Components/Layout";
import { connect } from "react-redux";
import actions from "../redux/actions";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import withUnAuth from "../utils/auth/withUnAuth";
import { withRouter } from "next/router";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
// };
// const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
// };

class Register extends Component {
    render() {
        const onFinish = (values) => {
            let body = {
                email: values.email,
                password: values.password,
                name: values.fullName,
                // phoneNumber: values.phoneNumber
            };
            this.props.register(body);
        };

        const antIcon = <LoadingOutlined style={{ fontSize: 18, marginRight: 10 }} spin />
        return (
            <Layout title="Register">
                <div className="container">
                    <div className="login-wrapper">
                        <div className="welcome-illus">
                            <img src="/images/welcome.png" />
                        </div>
                        <div className="login-right">
                            <div className="login-title">
                                <h1>Welcome!</h1>
                                <p>To connect with us, please register with your email</p>
                            </div>
                            <div className="login-form">
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="fullName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your fullname!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                                            type="text"
                                            placeholder="Full Name"
                                            autoComplete={false}
                                        />
                                    </Form.Item>
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
                                                // pattern:,
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
                                    {/* <Form.Item
                                        name="phoneNumber"
                                        rules={[
                                            {
                                                required: true,
                                                max: 10,
                                                pattern: /^(9)([0-9]{9})$/,
                                                message: "Please input valid phone number!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                                            type="number"
                                            placeholder="Phone Number"
                                            autoComplete={false}
                                        />
                                    </Form.Item> */}

                                    <Form.Item>
                                        <div className="login-create">
                                            <Button disabled={this.props.authentication.loading} htmlType="submit" className="primary">
                                                {this.props.authentication.loading && <Spin indicator={antIcon} />} Sign Up
                                            </Button>
                                            <Button disabled={this.props.authentication.loading} className="no-color">Login</Button>
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

export default withUnAuth(connect((state) => state, actions)(withRouter(Register)));
