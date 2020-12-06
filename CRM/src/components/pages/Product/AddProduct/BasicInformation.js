import React, {useEffect, useState} from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    AutoComplete,
    Space
} from "antd";
import Categories from "./Categories";
const BasicInformation = ({brands, layout, tailLayout}) => {
    const [form] = Form.useForm()
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [_brands, set_brands] = useState([]);
    useEffect(() => {
        set_brands(brands.map(b => ({
            lable: b.slug,
            value: b.brandName,
            key: b._id
        })))
    }, [brands]);

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const handleBrandChange = (value) => {
        let new_brands=[]
         brands.forEach(r => {
            if (r.brandName.toUpperCase().trim().indexOf(value.toUpperCase().trim()) !== -1){
                return new_brands.push({
                lable: r.slug,
                value: r.brandName,
                key: r._id
            })}
        })
        // console.log(new_brands);
        set_brands(new_brands)
    };
    const handleCategory = (e) => {
        let isAlreadyAdded = selectedCategories.includes(e.key);
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
                    <Input />
                </Form.Item>
                <Categories
                        selectedCategories={selectedCategories}
                        handleClick={handleCategory}
                        handleDeselect={handleDeselectCategory}
                    />
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
                    <AutoComplete
                        style={{
                            width: 200,
                        }}
                        onChange={handleBrandChange}
                        placeholder="brand name"
                        options={_brands}
                        
                    >
                        <Input />
                    </AutoComplete>
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

export default BasicInformation