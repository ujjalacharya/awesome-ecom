import React, {useEffect, useState} from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    AutoComplete,
    Space
} from "antd";
const {TextArea} = Input
const DetailInformation = ({ layout, tailLayout}) => {
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Form
                {...layout}
                name="detail    "
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Description"
                    name="descrption"
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            message: "Please input your product description!",
                        },
                    ]}
                >
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item
                    label="Highlights"
                    name="highlights"
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            message: "Please input highlights of the product!",
                        },
                    ]}
                >
                   <Input/>
                </Form.Item>
                <Form.Item
                    label="Warranty"
                    name="warranty"
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            message: 'Please input product warranty!',
                        },
                    ]}
                >
                <Input/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
            </Form>
        </>

    );
};

export default DetailInformation