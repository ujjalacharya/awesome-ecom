import { render } from 'nprogress';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';
import _ from 'lodash';
import Link from 'next/link'
import moment from 'moment'
import { Timeline, Form, Button } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { data } from 'jquery';

const OrderDetails = (props) => {
    let [form] = Form.useForm()

    let store = useSelector(state => state)
    let dispatch = useDispatch();

    let [deleteCancelOrder, setDeleteCancelOrder] = useState({ loading: false, success: false, data: {} });

    let [showCancelForm, setShowCancelForm] = useState(false)

    useEffect(() => {
        dispatch(actions.getOrderById(props.orderId))
    }, [props.orderId])

    useEffect(() => {
        if(props.visibleOrder === false){
            setShowCancelForm(false)
        }
    }, [props.visibleOrder])

    useEffect(() => {
        if (deleteCancelOrder.success) {
            dispatch(actions.getOrders('page=1'))
            form.resetFields()
            props.openCloseOrder()
            setShowCancelForm(false)
            setDeleteCancelOrder({ ...data, loading: false, success: false })
        }
    }, [deleteCancelOrder])

    const onFinish = (values) => {
        let body = {
            remark: values.remarks,
        };

        dispatch(actions.cancelOrder(props.orderId, body, deleteCancelOrder, setDeleteCancelOrder))
    };

    let { getOrderByIdResp: orderDetails } = store.order
    
    return (
        <div className="order-details">
            {
                orderDetails &&
                <>
                    <div className="ship-to">
                        <div className="ship-title">Shipping Address</div>
                        <div className="shipping-name">{orderDetails.user.name}</div>
                        <div className="shipping-address">{orderDetails.shipto.address}, {orderDetails.shipto.area}, {orderDetails.shipto.city}, {orderDetails.shipto.region}</div>
                        <div className="shipping-phone">{orderDetails.shipto.phoneno}</div>
                    </div>
                    <div className="total-summary">
                        <div className="summart-title">Transaction Details</div>
                        <div className="summary-detail">
                            <div className="title">Order ID</div>
                            <div className="sum-value">{orderDetails.orderID}</div>
                        </div>
                        <div className="summary-detail">
                            <div className="title">Transaction Code</div>
                            <div className="sum-value">{orderDetails.payment.transactionCode}</div>
                        </div>
                        <div className="summary-detail">
                            <div className="title">Ordered Date</div>
                            <div className="sum-value">{moment(orderDetails.updatedAt).format('YYYY/MM/DD hh:mm A')}</div>
                        </div>
                        <div className="summary-detail">
                            <div className="title">Is Paid</div>
                            <div className="sum-value">{orderDetails.isPaid ? 'Yes' : 'No'}</div>
                        </div>
                        <div className="summary-detail">
                            <div className="title">Method</div>
                            <div className="sum-value">{orderDetails.payment.method}</div>
                        </div>
                        <div className="summary-detail" style={{ border: 0, padding: 0 }}>
                        </div>
                    </div>
                    <div className="total-summary">
                        <div className="summart-title">Order Status</div>
                        <div className="timeline">
                            <Timeline>
                                {
                                    orderDetails.status.activeDate &&
                                    <Timeline.Item color="blue">
                                        <strong>Active</strong>
                                        <p>
                                            {moment(orderDetails.status.activeDate).format('YYYY/MM/DD hh:mm A')}
                                        </p>
                                    </Timeline.Item>
                                }
                                {
                                    orderDetails.status.approvedDate &&
                                    <Timeline.Item color="green">
                                        <strong>Approved</strong>
                                        <p>
                                            {moment(orderDetails.status.approvedDate).format('YYYY/MM/DD hh:mm A')}
                                        </p>
                                    </Timeline.Item>
                                }
                                {
                                    orderDetails.status.cancelledDetail.cancelledDate &&
                                    <Timeline.Item color="gray">
                                        <strong>Cancelled</strong>
                                        <p>
                                            By: {orderDetails.status.cancelledDetail.cancelledBy.name}
                                        </p>
                                        <p>
                                            Remark: {orderDetails.status.cancelledDetail.remark.comment}
                                        </p>
                                        <p>
                                            {moment(orderDetails.status.cancelledDetail.cancelledDate).format('YYYY/MM/DD hh:mm A')}
                                        </p>
                                    </Timeline.Item>
                                }
                            </Timeline>
                        </div>
                    </div>
                    <div className="total-summary">
                        <div className="summart-title">Total Summary</div>
                        <div className="summary-detail">
                            <div className="title">Subtotal</div>
                            <div className="sum-value">{orderDetails.payment.amount}</div>
                        </div>
                        <div className="summary-detail">
                            <div className="title">Shipping Fee</div>
                            <div className="sum-value">{orderDetails.payment.shippingCharge}</div>
                        </div>
                        <div className="summary-detail">
                            <div className="title">Total</div>
                            <div className="sum-value">{orderDetails.payment.amount + orderDetails.payment.shippingCharge}</div>
                        </div>
                    </div>
                    <div className="order-btns">
                        <Button className="primary">
                            <Link href={`/products/${orderDetails.product.slug}`}>
                                <a target="_blank">
                                    View Product Detail
                                </a>
                            </Link>
                        </Button>
                        {
                            orderDetails.status.currentStatus !== 'cancel' ?
                                (
                                    <Button className="danger" onClick={() => setShowCancelForm(true)}>Cancel Order</Button>
                                ) : (
                                    <Button disabled >Cancelled Order</Button>
                                )
                        }
                    </div>

                    {
                        showCancelForm &&
                        <div className="cancel-order-form">
                            <div className="cancel-title">Cancel Order Remarks</div>
                            <Form
                                name="cancel_order"
                                className="login-form"
                                // initialValues={{ remember: true }}
                                onFinish={onFinish}
                                form={form}
                            >
                                <Form.Item
                                    name="remarks"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your remarks!",
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder="Your Remarks"
                                        autoComplete="off"
                                        rows="4"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <div className="cancel-create">
                                        <Button disabled={deleteCancelOrder.loading} htmlType="submit" className="primary cancel-submit">
                                            Submit
                                        </Button>
                                        <Button onClick={() => setShowCancelForm(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default OrderDetails