import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router';

// antd
import { UserOutlined, LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Spin } from "antd";

// includes
import Layout from '../src/Components/Layout';
import { useDispatch } from 'react-redux';

//redux
import actions from '../redux/actions';

// utils
import { openNotification } from '../utils/common';
import withUnAuth from '../utils/auth/withUnAuth';

var jwt = require('jsonwebtoken');

const forgotPassword = (props) => {
    const dispatch = useDispatch();

    const [forgotPasswordState, setForgotPasswordState] = useState({ loading: false, success: false, data: {} })
    const [resetPasswordState, setResetPasswordState] = useState({ loading: false, success: false, data: {} })

    const onFinish = (values) => {
        let body = {
            email: values.email,
        };

        dispatch(actions.sendResendPasswordLink(body, forgotPasswordState, setForgotPasswordState));
    };

    const onFinishNewPass = (values) => {
        let body = {
            newPassword: values.newPassword,
            resetPasswordLink: queryToken
        }

        dispatch(actions.resetMyPassword(body, resetPasswordState, setResetPasswordState));
    }

    useEffect(() => {
        if (forgotPasswordState.success) {
            openNotification('success', forgotPasswordState.data.msg)
        }
    }, [forgotPasswordState])

    const antIcon = <LoadingOutlined style={{ fontSize: 18, marginRight: 10 }} spin />
    const queryToken = props.router?.query?.token;
    
    let tokenVerfied = false;
    
    if (queryToken) {
        try{
            tokenVerfied = jwt.verify(queryToken, process.env.JWT_EMAIL_VERIFICATION_KEY);
        } catch(error){
            if(error.name === "TokenExpiredError"){
                openNotification('Error', 'Reset link has expired')
            }else{
                openNotification('Error', 'Invalid Link') 
            }
        }
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
                            <p>{tokenVerfied ? 'Please enter your new password' : 'Please enter your to email to reset your password.'}</p>
                        </div>
                        {
                            tokenVerfied ? (
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
                                                    disabled={resetPasswordState.loading}
                                                    htmlType="submit"
                                                    className="primary"
                                                >
                                                    {
                                                        resetPasswordState.loading &&
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
                                                        type: 'email',
                                                        required: true,
                                                        message: "Please input valid Email!",
                                                    },
                                                ]}
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

export default withUnAuth(withRouter(forgotPassword));