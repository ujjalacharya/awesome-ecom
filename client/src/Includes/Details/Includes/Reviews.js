import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { withRouter } from "next/router";
import {
  openNotification,
  convertDateToCurrentTz,
} from "../../../../utils/common";

class Reviews extends Component {
  state = {
    productReviews: [],
  };

  componentDidMount() {
    if (this.props.products.productReviews) {
      this.setState({
        productReviews: this.props.products.productReviews,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.products.productReviews !==
        prevProps.products.productReviews &&
      this.props.products.productReviews
    ) {
      this.setState({
        productReviews: this.props.products.productReviews,
      });
    }
    if (
      this.props.products.postReviewResp !==
        prevProps.products.postReviewResp &&
      this.props.products.postReviewResp
    ) {
      openNotification("Success", "Review posted successfully");
      this.props.getProductReviews(this.props.router.query.slug);
    }
  }

  render() {
    return (
      <div className="details-reviews">
        <div className="product-reviews">
          <div className="title">Product Reviews</div>
          <div className="all-reviews">
            {!_.isEmpty(this.state.productReviews.reviews) ? (
              this.state.productReviews.reviews?.map((review, i) => {
                return (
                  <div className="user-review">
                    <div className="review-stars">
                      {Array(review.star)
                        .fill(0)
                        .map((num, i) => (
                          <i
                            className="fa fa-star"
                            aria-hidden="true"
                            key={i}
                          ></i>
                        ))}
                    </div>
                    <div className="reviewd-by">
                      <div className="reivewer-name">
                        by {review?.user?.name} -{" "}
                        {convertDateToCurrentTz(review.updatedAt)}
                      </div>
                      <div className="ver">
                        <img src="/images/social-media.png" />
                        Verified Purchase
                      </div>
                    </div>
                    <div className="review-body">{review.comment}</div>
                  </div>
                );
              })
            ) : (
              <div className="no-reviews">There are no reviews yet.</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(Reviews));
