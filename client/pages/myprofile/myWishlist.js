import React, { Component } from "react";
import { Input, Row, Col, Table, Popconfirm, Empty } from "antd";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import withPrivate from "../../utils/auth/withPrivate";
import {
    convertDateToCurrentTz,
    getDiscountedPrice,
    scrollToTop,
} from "../../utils/common";
import Link from "next/link";
import MyProfile from "../../src/Includes/MyProfile/myProfile";

const { Search } = Input;

class MyWishlist extends Component {
    state = {
        allWishlistItems: { wishlists: [], totalCount: 0 },
        currentPage: 1,
        loading: true,
        searchKeyword: ''
    };

    componentDidMount() {
        this.props.getWishListItems('page=1&perPage=10')
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.wishlist.getWishlistItems !== prevState.allWishlistItems &&
            nextProps.wishlist.getWishlistItems
        ) {
            scrollToTop();
            return {
                allWishlistItems: nextProps.wishlist.getWishlistItems,
                loading: false
            };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.cart.addToCartResp !== prevProps.cart.addToCartResp &&
            this.props.cart.addToCartResp
        ) {
            this.props.getWishListItems("page=1&perPage=10");
        }

        if (
            this.props.wishlist.removeFromWishlistResp !==
            prevProps.wishlist.removeFromWishlistResp &&
            this.props.wishlist.removeFromWishlistResp
        ) {
            this.props.getWishListItems("page=1&perPage=10");
        }

        if (this.props.user.userProfile !== prevProps.user.userProfile && this.props.user.userProfile) {
            this.setState({
                userInfo: this.props.user.userProfile
            })
        }
    }

    onChangePage = (page) => {
        this.setState({
            currentPage: page.current,
            loading: true
        });
        
        this.props.getWishListItems(
            `page=${page.current}&perPage=10&keyword=${this.state.searchKeyword}`
        );
    };

    getSearch = (val) => {
        this.setState({ searchKeyword: val, loading: true }, () =>
            // this.initialRequest()
            this.props.getWishListItems(
                `page=${this.state.currentPage}&perPage=10&keyword=${val}`
            )
        );
    };

    render() {
        let {
            allWishlistItems: { wishlists },
        } = this.state;

        const columns = [
            {
                title: "Image",
                dataIndex: "image",
                key: "image",
                render: (text, record) => (
                    <Link href="/products/[slug]" as={`/products/${record.slug}`}>
                        <a className="item-title">
                            <span>{text}</span>
                        </a>
                    </Link>
                ),
            },
            {
                title: "Item Name",
                dataIndex: "itemName",
                key: "itemName",
                render: (text, record) => (
                    <Link href="/products/[slug]" as={`/products/${record.slug}`}>
                        <a className="item-title">
                            <span>{text}</span>
                        </a>
                    </Link>
                ),
            },
            {
                title: "Sold By",
                dataIndex: "soldBy",
                key: "soldBy",
                render: (text) => <a>{text}</a>,
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
            },
            {
                title: "Added On",
                dataIndex: "addedOn",
                key: "addedOn",
            },
            {
                title: "Action",
                key: "action",
                render: (text) => (
                    <>
                        <div>
                            <Popconfirm
                                title="Are you sure delete this from wishlist?"
                                onConfirm={() => this.props.removeFromWishList(text.key)}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a className="action-btn action-btn-delete">
                                    <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
              </a>
                            </Popconfirm>
                        </div>

                        <div style={{ minWidth: 100, marginTop: 10 }}><a
                            className="action-btn action-btn-add"
                            onClick={() => this.props.addToCart(text.slug, { quantity: 1 })}
                        >
                            <i className="fa fa-plus" aria-hidden="true"></i> Add to Cart
            </a></div>
                    </>
                ),
            },
        ];

        let data = [];

        wishlists?.map((item) => {
            let discountedPrice = getDiscountedPrice(
                item.product.price.$numberDecimal,
                item.product.discountRate
            );

            let ele = {
                key: item._id,
                image: (
                    <img
                        src={`${process.env.IMAGE_BASE_URL}/${item.product.images[0].medium}`}
                        className="table-item-img"
                    />
                ),
                itemName: item.product.name,
                soldBy: item.product.soldBy.shopName,
                price: discountedPrice,
                addedOn: convertDateToCurrentTz(item.createdAt),
                slug: item.product.slug,
            };
            data.push(ele);
        });

        return (
            <MyProfile title="My Wishlist">
                <div className="my-wishlist">
                    <h3>My Wishlist</h3>
                    <Row>
                        <Col lg={8} xs={24}>
                            <Search
                                placeholder="Search By Item Name"
                                onSearch={(value) => this.getSearch(value)}
                                className="order-search"
                            />
                        </Col>
                        <Col lg={8} xs={24}>
                            {/* <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a status"
              defaultValue="All"
              optionFilterProp="children"
              onChange={this.onChange}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">All</Option>
              <Option value="toPay">To Pay</Option>
              <Option value="toShip">To Ship</Option>
              <Option value="toReceive">To Receive</Option>
            </Select> */}
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Table
                        className="orders-table table-wrapper"
                        columns={columns}
                        dataSource={data}
                        pagination={{ total: this.state.allWishlistItems?.totalCount }}
                        onChange={this.onChangePage}
                        loading={this.state.loading}
                        expandable={{
                            expandedRowRender: (record) =>
                                <table className="expanded-table">
                                    <tbody>
                                        <tr>
                                            <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                            <td>Sold By</td>
                                            <td>{record.soldBy}</td>
                                        </tr>
                                        <tr>
                                            <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                            <td>Price</td>
                                            <td>{record.price}</td>
                                        </tr>
                                        <tr>
                                            <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                            <td>Added On</td>
                                            <td>{record.addedOn}</td>
                                        </tr>
                                        <tr>
                                            <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                                            <td>Added On</td>
                                            <td>
                                                <>
                                                    <div>
                                                        <Popconfirm
                                                            title="Are you sure delete this from wishlist?"
                                                            onConfirm={() => this.props.removeFromWishList(record.key)}
                                                            // onCancel={cancel}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <a className="action-btn action-btn-delete">
                                                                <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
                            </a>
                                                        </Popconfirm>
                                                    </div>

                                                    <div style={{ minWidth: 100, marginTop: 10 }}>
                                                        <a
                                                            className="action-btn action-btn-add"
                                                            onClick={() => this.props.addToCart(record.slug, { quantity: 1 })}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i> Add to Cart
                          </a>
                                                    </div>
                                                </>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        }}
                    />

                    {this.state.allWishlistItems?.totalCount === 0 && <div className="no-data-table"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
                </div>

            </MyProfile>
        );
    }
}

export default connect((state) => state, actions)(withPrivate(MyWishlist));
