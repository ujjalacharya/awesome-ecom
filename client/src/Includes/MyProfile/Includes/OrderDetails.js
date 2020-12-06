import { render } from 'nprogress';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';
import _ from 'lodash';
import { Button } from 'antd';
import Link from 'next/link'
import moment from 'moment'

const OrderDetails = (props) => {
    let store = useSelector(state => state)
    let dispatch = useDispatch();
    console.log(store)
    useEffect(() => {
        dispatch(actions.getOrderById(props.orderId))
    }, [props.orderId])

    let { getOrderByIdResp: orderDetails } = store.order
    console.log(orderDetails)

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
                        <div className="summary-detail" style={{border: 0, padding:0}}>
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
                        <Button className="danger">Cancel Order</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderDetails