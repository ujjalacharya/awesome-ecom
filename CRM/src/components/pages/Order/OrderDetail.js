import React, {useEffect} from 'react'
import moment from 'moment'
import { Carousel, Avatar } from 'antd';
import { SideBySideMagnifier} from "react-image-magnifiers";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OrderStatus from './OrderStatus';
import OrderCancel from './OrderCancel';

const OrderDetail = ({ order ,singleLoading ,  isOrderDetailOpen }) => {
    function onChange(a, b, c) {
        // console.log(a, b, c);
    }
    useEffect(() => {
        console.log('helloworld');
        return () => {
            console.log('sdav')
        }
    }, [])
    const contentStyle = {
        height: '170px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
            <div className="row">
                <div className="col-xl-8">
                    <div className="card">
                        <div className="card-header">
                            {/* <h5 className="card-title mb-0">Clients</h5> */}
                        </div>
                        <div className="card-body ">
                            <div className="mb-2">
                                <h6>Product Details</h6>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    
                                <Carousel afterChange={onChange}>
                                {
                                    order?.product?.images.map(image=> (

                                    <div key={image._id}>
                                        <h3 style={contentStyle}>
                                            <SideBySideMagnifier
                                                style={{ height: '100%', width: '100%' }}
                                                alwaysInPlace={true}
                                                imageSrc={`${process.env.REACT_APP_SERVER_URL}/uploads/${image.medium}`}
                                                imageAlt="Example"
                                                // largeImageSrc={`${process.env.REACT_APP_SERVER_URL}/uploads/${image.large}`} // Optional
                                            />
                                         {/* <img style={{height:'100%',width:'100%'}} src={`${process.env.REACT_APP_SERVER_URL}/uploads/${image.medium}`}/> */}
                                         </h3>
                                    </div>
                                    ))
                                }
                                </Carousel>
                                </div>
                                <div className="col-md-6 text-md-right">
                                    <div className="text-muted">Name</div>
                                <strong>{order?.product?.name}</strong>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="mb-2">
                                <h6>Order Details</h6>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                <strong>
                                    <p>
                                    OrderID<br/> Current Status <br /> Quantity <br /> Created At <br />
                                    </p>
                                </strong>
                                </div>
                                <div className="col-md-6 text-md-right">
                                    <p>
                                    {order?.orderID} <br />
                                        <OrderStatus isOrderDetailOpen={isOrderDetailOpen} status={order?.status?.currentStatus} order_id={order?._id} admin_id={order?.soldBy} />
                                    <br /> {order?.quantity} <br /> {order && moment(order?.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")} <br />
                                    </p>
                                </div>
                            </div>
                        <hr className="my-4" />
                        <div className="mb-2">
                            <h6>Transaction Details</h6>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                            <strong>

                                <p>
                                    Transaction Code<br />isPaid <br/> Method <br /> Shipping Charge <br /> Amount <br /> Returned Amount <br />
                                </p>
                            </strong>
                            </div>
                            <div className="col-md-6 text-md-right">
                                <p>
                                    {order?.payment?.transactionCode}
                                    <br />
                                    {
                                        order && (order?.isPaid ? <span className="badge badge-pill badge-success">yes</span> :
                                     <span className="badge badge-pill badge-danger">no</span>)
                                     }
                                      <br /> {order?.payment?.method}

                                      <br/> {order?.payment?.shippingCharge} 

                                      <br/> {order?.payment?.amount} 
                                      <br /> {order?.payment?.returnedAmount} <br />
                                </p>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="mb-2">
                            <h6>User Details</h6>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <strong>

                                    <p>
                                        Name<br />Email <br /> DOB <br /> Gender <br /> Photo <br />
                                    </p>
                                </strong>
                            </div>
                            <div className="col-md-6 text-md-right">
                                <p>
                                    {order?.user?.name}<br />{order?.user?.email} <br /> {order?.user?.dob}<br /> {order?.user?.gender}<br /> {<Avatar shape="square" size='medium' src={`${process.env.REACT_APP_SERVER_URL}/uploads/${order?.user.photo}`} />}
                                </p>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-body">
                            <strong>Order Status</strong>
                            <ul className="timeline mt-2 mb-0">
                                {
                                    order?.status?.activeDate && <li className="timeline-item">
                                        <strong>Active</strong>
                                        <span className="float-right text-muted text-sm">{moment(order?.status?.activeDate).fromNow()}</span>
                                        <p></p>
                                    </li>
                                }
                                {
                                    order?.status?.approvedDate && <li className="timeline-item">
                                        <strong>Approved</strong>
                                        <span className="float-right text-muted text-sm">{moment(order?.status?.approvedDate).fromNow()}</span>
                                        <p></p>
                                    </li>
                                }
                                {
                                    order?.status?.dispatchedDetail?.dispatchedDate && <li className="timeline-item">
                                        <strong>Dispatched</strong>
                                        <span className="float-right text-muted text-sm">{moment(order?.status?.dispatchedDetail?.dispatchedDate).fromNow()}</span>
                                        <small>
                                            <p>This order is dispatched by {order?.status?.dispatchedDetail?.dispatchedBy?.name}<br />
                                                <strong>Email: </strong> {order?.status?.dispatchedDetail?.dispatchedBy?.email}<br />
                                                <strong>Phone: </strong> {order?.status?.dispatchedDetail?.dispatchedBy?.phone}
                                            </p>
                                        </small>
                                    </li>
                                }
                                {
                                    order?.status?.completedDate && <li className="timeline-item">
                                        <strong>Completed</strong>
                                        <span className="float-right text-muted text-sm">{moment(order?.status?.completedDate).fromNow()}</span>
                                        <p></p>
                                    </li>
                                }
                                {
                                    order?.status?.tobereturnedDate && <li className="timeline-item">
                                        <strong>To be returned</strong>
                                        <span className="float-right text-muted text-sm">{moment(order?.status?.tobereturnedDate).fromNow()}</span>
                                        <p></p>
                                    </li>
                                }
                                {
                                    order?.status?.returnedDetail?.returnedDate && <li className="timeline-item">
                                        <strong>Returned</strong>
                                        <span className="float-right text-muted text-sm">{moment(order?.status?.returnedDetail?.returnedDate).fromNow()}</span>
                                        <small>
                                            <p>This order is returned by {order?.status?.returnedDetail?.returneddBy?.name}<br />
                                                <strong>Email: </strong> {order?.status?.returnedDetail?.returneddBy?.email}<br />
                                                <strong>Phone: </strong> {order?.status?.returnedDetail?.returneddBy?.phone}<br/>
                                            <strong>Customer reason: </strong> {order?.status?.returnedDetail?.remark[0]?.comment}<br />
                                            </p>
                                        </small>
                                    </li>
                                }
                                {
                                    order?.status?.cancelledDetail?.cancelledDate && <li className="timeline-item">
                                        <strong>Cancelled</strong>
                                        <span className="float-right text-muted text-sm">{moment(order?.status?.cancelledDetail?.cancelledDate).fromNow()}</span>
                                        <small> <p>This order is cancelled by {order?.status?.cancelledDetail?.cancelledBy?.name}.<br />
                                            <strong>Reason: </strong>{order?.status?.cancelledDetail?.remark?.comment}</p>
                                        </small>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                {
                    order && (order.status.currentStatus==='active' || order.status.currentStatus==='approve') && <OrderCancel isOrderDetailOpen={isOrderDetailOpen} order_id={order?._id} admin_id={order?.soldBy} />
                }
                </div>
                
            </div>
    )
}

OrderDetail.propTypes = {
    order: PropTypes.object,
    singleLoading: PropTypes.bool,
}
const mapStateToProps = (state) => ({
    order: state.order.order,
    singleLoading: state.order.singleLoading
})

export default connect(mapStateToProps,{})(React.memo(OrderDetail))

