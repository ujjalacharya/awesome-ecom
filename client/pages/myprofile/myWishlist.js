import React, { Component, useEffect, useState } from "react";
import { Input, Row, Col, Table, Popconfirm, Empty } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import withPrivate from "../../utils/auth/withPrivate";
import {
    convertDateToCurrentTz,
    getDiscountedPrice,
    previousQuery,
    scrollToTop,
} from "../../utils/common";
import Link from "next/link";
import MyProfile from "../../src/Includes/MyProfile/myProfile";
import { IMAGE_BASE_URL } from "../../utils/constants";
import { myWishlistSkeleton } from "../../utils/skeletons";
import initialize from "../../utils/initialize";

const { Search } = Input;

const MyWishlist = (props) => {
    const dispatch = useDispatch();
    const wishlistState = useSelector(state => state.wishlist);
    const userProfile = useSelector(state => state.user.userProfile);

    const { getWishlistItems: wishlistItems, wishlistItemsResp, removeFromWishlistResp, wishlistLoading } = wishlistState

    let [allWishlistItems, setAllWishlistItems] = useState(myWishlistSkeleton);
    let [currentPage, setCurrentPage] = useState(1);
    let [loading, setLoading] = useState(true);
    let [searchKeyword, setSearchKeyword] = useState('');
    let [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (!props.isServer) {
            dispatch(actions.getWishListItems('page=1&perPage=10'));
        }
    }, []);

    const prevWishlistItems = previousQuery(wishlistItems);

    const prevWishlistItemsResp = previousQuery(wishlistItemsResp)
    const prevRemoveFromWishlistResp = previousQuery(removeFromWishlistResp)

    const prevUserProfile = previousQuery(userProfile)
    useEffect(() => {
        if (prevWishlistItems !== wishlistItems && wishlistItems) {
            setAllWishlistItems(wishlistItems);
            setLoading(false);
        }

        if (wishlistItemsResp !== prevWishlistItemsResp && wishlistItemsResp) {
            dispatch(actions.getProductsByCategory("page=1&perPage=10"))
        }

        if (removeFromWishlistResp !== prevRemoveFromWishlistResp && removeFromWishlistResp) {
            dispatch(actions.getProductsByCategory("page=1&perPage=10"))
        }

        if (userProfile !== prevUserProfile && userProfile) {
            setUserInfo(userProfile)
        }
    }, [wishlistItems, wishlistItemsResp, removeFromWishlistResp])

    let prevCurrentPage = previousQuery(currentPage);
    let prevSearchKeyword = previousQuery(searchKeyword);

    useEffect(() => {
        if (prevCurrentPage !== undefined && currentPage !== prevCurrentPage) {
            dispatch(actions.getWishListItems(
                `page=${currentPage}&perPage=10&keyword=${searchKeyword}`
            ));
        }
        if (prevSearchKeyword !== undefined && searchKeyword !== prevSearchKeyword) {
            dispatch(actions.getWishListItems(
                `page=${currentPage}&perPage=10&keyword=${searchKeyword}`
            ));
        }
    }, [currentPage, searchKeyword])

    const onChangePage = (page) => {
        setCurrentPage(page.current);
        scrollToTop();
    };

    const getSearch = (val) => {
        setCurrentPage(1);
        setSearchKeyword(val);
    };

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
                            onConfirm={() => dispatch(actions.removeFromWishList(text.key))}
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
                            onClick={() => dispatch(actions.addToCart(text.slug, { quantity: 1 }))}
                        >
                            <i className="fa fa-plus" aria-hidden="true"></i> Add to Cart
                        </a>
                    </div>
                </>
            ),
        },
    ];

    let data = [];

    allWishlistItems?.wishlists?.map((item) => {
        let discountedPrice = getDiscountedPrice(
            item.product.price.$numberDecimal,
            item.product.discountRate
        );

        let ele = {
            key: item._id,
            image: (
                <img
                    src={`${IMAGE_BASE_URL}/${item.product.images[0].medium}`}
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
                            onSearch={(value) => getSearch(value)}
                            className="order-search"
                        />
                    </Col>
                    <Col lg={8} xs={24}>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Table
                    className="orders-table table-wrapper"
                    columns={columns}
                    dataSource={data}
                    pagination={{ total: allWishlistItems?.totalCount, current: currentPage }}
                    onChange={onChangePage}
                    loading={wishlistLoading}
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
                                                        onConfirm={() => dispatch(actions.removeFromWishList(record.key))}
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
                                                        onClick={() => dispatch(actions.addToCart(record.slug, { quantity: 1 }))}
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

                {allWishlistItems?.totalCount === 0 && <div className="no-data-table"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
            </div>

        </MyProfile>
    );
}

MyWishlist.getInitialProps = async (ctx) => {
    initialize(ctx);

    if (ctx.isServer) {
        await ctx.store.dispatch(actions.getWishListItems('page=1&perPage=10', ctx))
    }

    return {
        isServer: ctx.isServer
    }
}

export default withPrivate(MyWishlist);
