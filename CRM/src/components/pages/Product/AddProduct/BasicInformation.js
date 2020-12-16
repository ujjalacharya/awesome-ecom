import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    Select,
    Col,
    Row
} from "antd";
import Categories from "./Categories";
import { ImageUploader } from "./ImageUploader";
const BasicInformation = ({ brands, layout, tailLayout, next, basicFormData }) => {
    const [form] = Form.useForm()
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [_brands, set_brands] = useState([]);
    useEffect(() => {
        set_brands(brands.map(b => ({
            label: b.brandName,
            value: b.slug
        })))
    }, [brands]);

    useEffect(() => {
        const { name, category, brand, tags, model } = basicFormData
        form.setFieldsValue({ name, category, brand, tags, model })
        setSelectedCategories([...selectedCategories, ...category])
    }, [basicFormData])

    const onFinish = (values) => {
        next()
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };
    const onSubmit = () => {
        form.submit()
    }
    const handleCategory = (e) => {
        let isAlreadyAdded = selectedCategories.includes(e.key);
        if (!isAlreadyAdded) {
            form.setFieldsValue({
                category: [...selectedCategories, e.key],
            })
        }
        return isAlreadyAdded
            ? null
            : setSelectedCategories([...selectedCategories, e.key]);
    };
    const handleDeselectCategory = (value) => {
        return setSelectedCategories(
            selectedCategories.filter((cat) => cat !== value)
        );
    };
    return (
        <>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            message: "Please input your product name!",
                        },
                    ]}
                >
                    <Input style={{ width: '100%' }} placeholder="product name" />
                </Form.Item>
                <Categories
                    selectedCategories={selectedCategories}
                    handleClick={handleCategory}
                    handleDeselect={handleDeselectCategory}
                />                
                <Row justify="center" gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div style={{padding: '8px 0'}}>
                            <Form.Item
                                label="Model"
                                name="model"
                                rules={[
                                    {
                                        type: 'string',
                                    }
                                ]}
                            >
                                <Input style={{ width: '100%' }} placeholder="product model" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Brand"
                                name="brand"
                                rules={[
                                    {
                                        type: 'string',
                                        required: true,
                                        message: 'Please input product brand!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a brand"
                                    optionFilterProp="children"
                                    options={_brands}
                                    filterOption={(input, option) =>
                                        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    } />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={{padding: '8px 0'}}>
                            <Form.Item
                                label="Tags"
                                name="tags"
                                rules={[
                                    {
                                        type: 'array',
                                    }
                                ]}
                            >
                                <Select open={false} mode="tags" style={{ width: '100%' }} placeholder="Add Tags" />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <ImageUploader/>
                
            </Form>
            <div className="steps-action">
                <Button type="primary" onClick={onSubmit}>
                    Next
                </Button>
            </div>
        </>

    );
};

export default React.memo(BasicInformation)