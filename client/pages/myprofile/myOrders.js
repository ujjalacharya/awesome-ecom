import React, { useEffect, useState } from "react";
import { capitalize } from "lodash";
import moment from 'moment'
import { Input, Row, Col, Select, Table, Tag, Drawer, Spin, Empty } from "antd";

// redux
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";

// next router
import { withRouter } from "next/router";

// utils
import { IMAGE_BASE_URL } from "../../utils/constants";
import { previousQuery, scrollToTop } from "../../utils/common";

// includes
import OrderDetails from "../../src/Includes/MyProfile/Includes/OrderDetails";
import MyProfile from "../../src/Includes/MyProfile/myProfile";
import { myOrdersSkeleton } from "../../utils/skeletons";
import initialize from "../../utils/initialize";

const { Search } = Input;
const { Option } = Select;

const MyOrders = (props) => {
    const dispatch = useDispatch();
    const ordersState = useSelector(state => state.order);

    const { getOrders: orders, getOrdersStatus: orderStatus } = ordersState;

    let [myOrders, setMyOrders] = useState(myOrdersSkeleton);
    let [orderStatuses, setOrderStatuses] = useState(['']);
    let [currentStatus, setCurrentStatus] = useState('');
    let [currentPage, setCurrentPage] = useState(1);
    let [searchKeyword, setSearchKeyword] = useState('');
    let [loading, setLoading] = useState(true);
    let [visibleOrder, setVisibleOrder] = useState(false);
    let [selectedOrderId, setSelectedOrderId] = useState('');

    useEffect(() => {
        if (!props.isServer) {
            dispatch(actions.getOrders(`page=1`));
            dispatch(actions.getOrdersStatuses());
        }
    }, [])

    let prevOrders = previousQuery(orders)
    let prevOrderStatus = previousQuery(orderStatus)

    useEffect(() => {
        if (orders !== prevOrders && orders) {
            setMyOrders(orders);
            setLoading(false);
        }

        if (orderStatus !== prevOrderStatus && orderStatus) {
            setOrderStatuses(orderStatus);
            setLoading(false);
        }
    }, [orders, orderStatus])

    const initialRequest = () => {
        let appendUrl = "";

        appendUrl = `page=${currentPage}`;

        appendUrl =
            appendUrl +
            (currentStatus ? `&status=${currentStatus}` : "");

        appendUrl =
            appendUrl +
            (searchKeyword ? `&keyword=${searchKeyword}` : "");

        dispatch(actions.getOrders(appendUrl));
    };

    useEffect(() => {
        if (!props.isServer) {
            initialRequest();
            setLoading(true);
        }
    }, [currentStatus, currentPage, searchKeyword])

    const getSearch = (val) => {
        setSearchKeyword(val);
    };

    const onChangePage = (page) => {
        setCurrentPage(page.current);
        scrollToTop();
    };

    const onStatusChange = (status) => {
        setCurrentStatus(status);
    };

    const onOpenCloseOrder = () => {
        setVisibleOrder(!visibleOrder)
    }

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Item Name",
            dataIndex: "itemName",
            key: "itemName",
            render: (text, record) => (
                // <Link href="/products/[slug]" as={`/products/${record.slug}`}>
                <a
                    className="item-title"
                    onClick={() => {
                        onOpenCloseOrder();
                        setSelectedOrderId(record.key);
                    }}
                >
                    <span>{text}</span>
                </a>
                // </Link>
            ),
        },
        {
            title: "Order Date",
            dataIndex: "orderDate",
            key: "orderDate",
            render: (text, record) => (
                moment(record.orderDate).format('YYYY/MM/DD')
            ),
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (tags) => (
                <>
                    {tags.map((tag) => {
                        let color = "";
                        if (tag === "approve" || tag === "complete") {
                            color = "green";
                        } else if (tag === "cancelled") {
                            color = "red";
                        } else if (tag === "dispatch" || tag === "active") {
                            color = "blue";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },

        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Sold By",
            dataIndex: "soldBy",
            key: "soldBy",
            render: (text) => <a>{text}</a>,
        }
    ];

    let data = [];

    myOrders?.orders.map((order) => {
        let ele = {
            key: order._id,
            image: (
                <img
                    src={
                        IMAGE_BASE_URL + "/" + order.product.images[0].medium
                    }
                    className="table-item-img"
                />
            ),
            itemName: order.product.name,
            status: [order.status.currentStatus],
            soldBy: order.soldBy.shopName,
            qty: order.quantity,
            price: order.product.price.$numberDecimal,
            slug: order.product.slug,
            orderDate: order.updatedAt
        };
        data.push(ele);
    });

    return (
        <MyProfile title="My Orders">
            <div className="my-orders">
                <h3>My Orders</h3>
                <Row gutter={10}>
                    <Col lg={10} xs={24} sm={10}>
                        <Search
                            placeholder="Search By Item Name"
                            onSearch={(value) => getSearch(value)}
                            className="order-search"
                        />
                    </Col>
                    <Col lg={8} xs={24} sm={8}>
                        <Select
                            showSearch
                            className="order-select"
                            placeholder="Select a status"
                            defaultValue="All"
                            optionFilterProp="children"
                            onChange={(status) => onStatusChange(status)}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value=''>All</Option>
                            {orderStatuses?.map((status, i) => {
                                return (
                                    <Option value={status} key={i}>
                                        {status === "tobereturned"
                                            ? "To Be Returned"
                                            : capitalize(status)}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Table
                    className="orders-table table-wrapper"
                    columns={columns}
                    dataSource={data}
                    pagination={{ total: myOrders?.totalCount }}
                    onChange={onChangePage}
                    loading={false}
                    expandable={{
                        expandedRowRender: (record) =>
                            <table className="expanded-table">
                                <tbody>
                                    <tr>
                                        <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                        <td>Status</td>
                                        <td>{record.status.map((tag) => {
                                            let color = "";
                                            if (tag === "approve" || tag === "complete") {
                                                color = "green";
                                            } else if (tag === "cancelled") {
                                                color = "red";
                                            } else if (tag === "dispatch" || tag === "active") {
                                                color = "blue";
                                            }
                                            return (
                                                <Tag color={color} key={tag}>
                                                    {tag.toUpperCase()}
                                                </Tag>
                                            );
                                        })}</td>
                                    </tr>
                                    <tr>
                                        <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                        <td>Qty</td>
                                        <td>{record.qty}</td>
                                    </tr>
                                    <tr>
                                        <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                        <td>Price</td>
                                        <td>{record.price}</td>
                                    </tr>
                                    <tr>
                                        <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                        <td>Sold By</td>
                                        <td>{record.soldBy}</td>
                                    </tr>
                                </tbody>
                            </table>
                    }}
                />
                {myOrders?.totalCount === 0 && <div className="no-data-table"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
                <Drawer
                    title="Order Details"
                    placement="right"
                    closable={true}
                    onClose={onOpenCloseOrder}
                    visible={visibleOrder}
                    className="showSortDrawer"
                    width="auto"
                >
                    <OrderDetails visibleOrder={visibleOrder} orderId={selectedOrderId} openCloseOrder={onOpenCloseOrder} />
                </Drawer>

                {
                    (ordersState.loading || ordersState.orderByIdLoading) &&
                    <div className="loader-overlay">
                        <Spin className="spinner" />
                    </div>
                }
            </div>

        </MyProfile>
    );
}

MyOrders.getInitialProps = async (ctx) => {
    initialize(ctx);

    if (ctx.isServer) {
        await ctx.store.dispatch(actions.getOrders(`page=1`, ctx));
        await ctx.store.dispatch(actions.getOrdersStatuses(ctx));
    }

    return {
        isServer: ctx.isServer
    }
}

export default withRouter(MyOrders);