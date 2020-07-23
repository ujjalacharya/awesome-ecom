import React, { Component } from "react";
import { withRouter } from "next/router";
import actions from "../../../redux/actions";
import { connect } from "react-redux";

class MyReviews extends Component {
  render() {
    console.log(this.props);
    let { myReviews } = this.props.user.myReviews;
    return (
      <div className="my-reviews">
        <h3>My Reviews</h3>
        {myReviews?.map((review, i) => {
          return (
            <div key={i} className="shop-review">
              <div className="shop-name">{review.product.soldBy.shopName}</div>
              <div className="product-name">{review.product.name}</div>
              <div className="ratings">
                {Array(review.star)
                  .fill(0)
                  .map((num, i) => {
                    return (
                      <i className="fa fa-star" aria-hidden="true" key={i}></i>
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
                <div className="review-cmt">{review.comment}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(MyReviews));
