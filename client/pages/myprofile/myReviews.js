import React, { Component } from "react";
import actions from "../../redux/actions";
import { connect } from "react-redux";
import { Pagination, Spin } from "antd";
import withPrivate from "../../utils/auth/withPrivate";
import MyProfile from "../../src/Includes/MyProfile/myProfile";

class MyReviews extends Component {
    state = {
        myReviews: {}
    }

    componentDidMount() {
        this.props.getMyReviews(`page=1`)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user.myReviews !== prevState.myReviews && nextProps.user.myReviews) {
            return {
                myReviews: nextProps.user.myReviews
            }
        }
    }

    onChangePage = (page) => {
        this.props.getMyReviews(`page=${page}`);
    };

    render() {
        let { myReviews } = this.state.myReviews;
        return (
            <>
                <MyProfile title="My Reviews">
                    <div className="my-reviews">
                        <h3>My Reviews</h3>
                        {myReviews?.map((review, i) => {
                            return (
                                <div key={i} className="shop-review">
                                    <div className="shop-name">
                                        <img src="/images/default-user.png" />
                                        {review.product.soldBy.shopName}
                                    </div>
                                    <div className="name-rating">
                                        <div className="product-name">{review.product.name}</div>
                                        <div className="ratings">
                                            {Array(review.star)
                                                .fill(0)
                                                .map((num, i) => {
                                                    return (
                                                        <i
                                                            className="fa fa-star"
                                                            aria-hidden="true"
                                                            key={i}
                                                        ></i>
                                                    );
                                                })}
                                            {Array(5 - review.star)
                                                .fill(0)
                                                .map((num, k) => {
                                                    return (
                                                        <i
                                                            className="fa fa-star fade-star"
                                                            aria-hidden="true"
                                                            key={k}
                                                        ></i>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                    <div className="review-cmt">{review.comment}</div>
                                </div>
                            );
                        })}
                        <div className="all-pagination">
                            <Pagination
                                defaultCurrent={1}
                                pageSize={5}
                                total={this.state.myReviews?.totalCount}
                                onChange={this.onChangePage}
                                showLessItems={true}
                            />
                        </div>
                    </div>
                    {
                        this.props.user.reviewLoading && 
                        <div className="loader-overlay">
                            <Spin className="spinner" />
                        </div>
                    }
                </MyProfile>
            </>
        );
    }
}

export default connect((state) => state, actions)(withPrivate(MyReviews));
