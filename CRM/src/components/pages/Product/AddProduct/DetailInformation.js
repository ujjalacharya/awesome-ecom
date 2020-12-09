import React, {useEffect, useState} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    AutoComplete,
    Space
} from "antd";
const DetailInformation = ({ layout, tailLayout}) => {
    const [form] = Form.useForm()
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
                                // items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
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
                                // items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
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
                <Form.List name="videoURL" label="Video URL">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'first']}
                                        label={`${field.name + 1} url`}
                                        fieldKey={[field.fieldKey, 'first']}
                                        rules={[{ type: 'url' }]}
                                    >
                                        <Input placeholder='https://www.youtube.com/watch?v=CICUUy22JpY&list' style={{ width: '100%' }} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}
                            <Form.Item label="Video Url">
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add
              </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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