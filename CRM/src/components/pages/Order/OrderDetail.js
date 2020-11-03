import React from 'react'
import moment from 'moment'
import { Carousel } from 'antd';

const OrderDetail = ({ order }) => {
    function onChange(a, b, c) {
        console.log(a, b, c);
    }
    const contentStyle = {
        height: '160px',
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
                            <div className="row">
                                <div className="col-md-6">
                                    
                                <Carousel dots={{color:'black'}} afterChange={onChange}>
                                    <div>
                                        <h3 style={contentStyle}> <img class="img-fluid" src="https://i.imgur.com/iItpzRh.jpg" /></h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}>2</h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}> <img class="img-fluid" src="https://i.imgur.com/iItpzRh.jpg" /></h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}> <img class="img-fluid" src="https://i.imgur.com/iItpzRh.jpg" /></h3>
                                    </div>
                                </Carousel>
                                </div>
                                <div className="col-md-6 text-md-right">
                                    <div className="text-muted">Payment Date</div>
                                    <strong>October 2, 2018 - 03:45 pm</strong>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="text-muted">Client</div>
                                    <strong>
                                        Chris Wood
                                     </strong>
                                    <p>
                                        4183 Forest Avenue <br /> New York City <br /> 10011 <br /> USA <br />
                                        <a href="#">
                                            chris.wood@gmail.com
                                         </a>
                                    </p>
                                </div>
                                <div className="col-md-6 text-md-right">
                                    <div className="text-muted">Payment To</div>
                                    <strong>
                                        AppStack LLC
                                     </strong>
                                    <p>
                                        354 Roy Alley <br /> Denver <br /> 80202 <br /> USA <br />
                                        <a href="#">
                                            info@appstack.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th className="text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AppStack Theme Customization</td>
                                        <td>2</td>
                                        <td className="text-right">$150.00</td>
                                    </tr>
                                    <tr>
                                        <td>Monthly Subscription </td>
                                        <td>3</td>
                                        <td className="text-right">$25.00</td>
                                    </tr>
                                    <tr>
                                        <td>Additional Service</td>
                                        <td>1</td>
                                        <td className="text-right">$100.00</td>
                                    </tr>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Subtotal </th>
                                        <th className="text-right">$275.00</th>
                                    </tr>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Shipping </th>
                                        <th className="text-right">$8.00</th>
                                    </tr>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Discount </th>
                                        <th className="text-right">5%</th>
                                    </tr>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Total </th>
                                        <th className="text-right">$268.85</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p className="text-sm">
                                    <strong>Extra note:</strong> Please send all items at the same time to the shipping address. Thanks in advance.
                                    </p>
                                <a href="#" className="btn btn-primary">
                                    Print this receipt
                                </a>
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
                                                <strong>Phone: </strong> {order?.status?.returnedDetail?.returneddBy?.phone}
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
                </div>
            </div>


    )
}

export default React.memo(OrderDetail)
