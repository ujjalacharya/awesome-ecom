import React from 'react'

// antd
import { UserOutlined, LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Spin } from "antd";

// includes
import Layout from '../src/Components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
import { useEffect } from 'react';
import { useState } from 'react';
import { openNotification } from '../utils/common';
import { withRouter } from 'next/router';
import jwt_decode from "jwt-decode";

const forgotPassword = (props) => {
    const dispatch = useDispatch();

    const authentication = useSelector(state => state.authentication)
    const [forgotPasswordState, setForgotPasswordState] = useState({ loading: false, success: false, data: {} })
    const [resetPasswordState, setResetPasswordState] = useState({ loading: false, success: false, data: {} })

    const onFinish = (values) => {
        let body = {
            email: values.email,
        };

        dispatch(actions.resetMyPassword(body, forgotPasswordState, setForgotPasswordState));
    };

    const onFinishNewPass = (values) => {
        console.log(values)
    }

    useEffect(() => {
        if (forgotPasswordState.success) {
            openNotification('success', forgotPasswordState.data.msg)
        }
    }, [forgotPasswordState])

    const antIcon = <LoadingOutlined style={{ fontSize: 18, marginRight: 10 }} spin />
    const queryToken = props.router?.query?.token;
    let decodedToken = '';
    if (queryToken) {
        decodedToken = jwt_decode(queryToken)
    }

    return (
        <Layout title="Forgot Password">
            <div className="container">
                <div className="login-wrapper">
                    <div className="welcome-illus">
                        <img src="/images/welcome.png" />
                    </div>
                    <div className="login-right">
                        <div className="login-title">
                            <h1>Reset My Password</h1>
                            <p>{decodedToken ? 'Please enter your new password' : 'Please enter your to email to reset your password.'}</p>
                        </div>
                        {
                            decodedToken ? (
                                <div className="login-form">
                                    <Form
                                        name="forgotPassword"
                                        className="login-form"
                                        onFinish={onFinishNewPass}
                                    >
                                        <Form.Item
                                            name="newPassword"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your new password!",
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                placeholder="New Password"
                                                autoComplete="off"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirmPass"
                                            dependencies={['newPassword']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (!value || getFieldValue('newPassword') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject('The two passwords that you entered do not match!');
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                placeholder="Confirm New Password"
                                                autoComplete="off"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <div className="login-create">
                                                <Button
                                                    disabled={forgotPasswordState.loading}
                                                    htmlType="submit"
                                                    className="primary"
                                                >
                                                    {
                                                        forgotPasswordState.loading &&
                                                        <Spin indicator={antIcon} />
                                                    }
                                                    Change Password
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ) : (
                                    <div className="login-form">
                                        <Form
                                            name="forgotPassword"
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
                                            <Form.Item>
                                                <div className="login-create">
                                                    <Button disabled={forgotPasswordState.loading} htmlType="submit" className="primary">
                                                        {forgotPasswordState.loading && <Spin indicator={antIcon} />}Reset My Password
                                        </Button>
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(forgotPassword);