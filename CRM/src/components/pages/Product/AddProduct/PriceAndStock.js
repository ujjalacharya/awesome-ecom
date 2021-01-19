import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import {
    Button,
    Form,
    Input,
    Col,
    Row
} from "antd";
const PriceAndStock = ({ layout, prev, submitProductInfo, loading }) => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        submitProductInfo()
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
                name="price_and_stock"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                
                <Form.Item
                    label="Selling Price"
                    name="price"
                    rules={[
                        {
                            type: 'string',
                        }
                    ]}
                >
                    <Input style={{ width: '100%' }} placeholder="2000" />
                </Form.Item>

                <Form.Item
                    label="Discount Rate"
                    name="discountRate"
                    rules={[
                        {
                            type: 'string',
                        }
                    ]}
                >
                    <Input style={{ width: '100%' }} placeholder="15.6" />
                </Form.Item>

                <Form.Item
                    label="Quantity on Stock"
                    name="price"
                    rules={[
                        {
                            type: 'string',
                        }
                    ]}
                >
                    <Input style={{ width: '100%' }} placeholder="100" />
                </Form.Item>
            </Form>
            <div className="steps-action">
                <Button style={{ margin: "0 8px" }} onClick={() => prev(form.getFieldsValue())}>
                    Previous
                </Button>
                <Button disabled={loading} type="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </div>
        </>

    );
};

PriceAndStock.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) =>  ({
    loading: state.product.addProductLoading
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PriceAndStock))