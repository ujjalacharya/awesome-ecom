import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";

// redux
import actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

// utils
import withPrivate from "../../utils/auth/withPrivate";
import { previousQuery } from "../../utils/common";
import { myReviewsSkeleton } from "../../utils/skeletons";
import initialize from "../../utils/initialize";

// includes
import MyProfile from "../../src/Includes/MyProfile/myProfile";

const MyReviews = (props) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.user.myReviews);
    const reviewLoading = useSelector(state => state.user.reviewLoading);
    
    let [myReviews, setMyReviews] = useState(myReviewsSkeleton);

    useEffect(() => {
        if (!props.isServer) {
            dispatch(actions.getMyReviews(`page=1`))
        }
    }, [])

    let prevReviews = previousQuery(reviews);

    useEffect(() => {
        if (reviews !== prevReviews && reviews) {
            setMyReviews(reviews.myReviews)
        }
    }, [reviews])

    const onChangePage = (page) => {
        dispatch(actions.getMyReviews(`page=${page}`));
    };

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
                            total={reviews?.totalCount}
                            onChange={onChangePage}
                            showLessItems={true}
                        />
                    </div>
                </div>
            </MyProfile>
        </>
    );
}

MyReviews.getInitialProps = async (ctx) => {
    initialize(ctx);

    if (ctx.isServer) {
        await ctx.store.dispatch(actions.getMyReviews(`page=1`, ctx))
    }

    return {
        isServer: ctx.isServer
    }
}


export default withPrivate(MyReviews);
