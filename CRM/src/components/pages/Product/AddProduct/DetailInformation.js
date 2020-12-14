import React, {useEffect, useState} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Select,
    Col,
    Row
} from "antd";
const DetailInformation = ({ layout, tailLayout, next, prev}) => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        next()
    };
    const onSubmit = () => {
        form.submit()
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Form
                {...layout}
                name="detail"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            
                            required: true,
                            message: "Please input your product description!",
                        },
                    ]}
                >
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: {
                                items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                            },
                            placeholder:"Product full descrption here.."
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            form.setFieldsValue({
                                description: data,
                            })
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Highlights"
                    name="highlights"
                    rules={[
                        {
                            required: true,
                            message: "Please input highlights of the product!",
                        },
                    ]}
                >
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: {
                                items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                            },
                            placeholder:'Product Highlights here..'
                            }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            form.setFieldsValue({
                                highlights: data,
                            })
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Video Url"
                    name="videoURL"
                    rules={[
                        {
                            type: 'url',
                        }
                    ]}
                >
                    <Input style={{ width: '100%' }} placeholder="https://www.youtube.com/watch?v=CICUUy22JpY&list" />
                </Form.Item>
                <Row justify="center" gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Color"
                                name="color"
                                rules={[
                                    {
                                        type: 'array',
                                    }
                                ]}
                            >
                                <Select open={false} mode="tags" style={{ width: '100%' }} placeholder="Black, Red" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={10}>
                        <div style={{ padding: '8px 0' }}>
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
                                <Input />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Weight"
                                name="weight"
                                rules={[
                                    {
                                        type: 'array',
                                    }
                                ]}
                            >
                                <Select open={false} mode="tags" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row justify="center" gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Return"
                                name="return"
                                rules={[
                                    {
                                        type: 'string',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Size"
                                name="size"
                                rules={[
                                    {
                                        type: 'array',
                                    }
                                ]}
                            >
                                <Select open={false} mode="tags" style={{ width: '100%' }}/>
                            </Form.Item>
                        </div>
                    </Col>
                </Row>

                {/* <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
            </Form>
            <div className="steps-action">
                <Button type="primary" onClick={onSubmit}>
                    Next
                </Button>
                <Button style={{ margin: "0 8px" }} onClick={prev}>
                    Previous
            </Button>
            </div>
        </>

    );
};

export default DetailInformation