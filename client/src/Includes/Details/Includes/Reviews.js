import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { withRouter } from "next/router";
import {
  openNotification,
  convertDateToCurrentTz,
} from "../../../../utils/common";
import { Progress } from "antd";
import StarRatings from "react-star-ratings";

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

  showStars = (starsPercentage, totalStars, star) => {
    return (
      <div className="stars-show">
        <div className="star-show">
          <StarRatings
            rating={totalStars}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="#f2c900"
            starEmptyColor="#eee"
          />
        </div>
        <div className="star-bar">
          <Progress
            percent={starsPercentage}
            showInfo={false}
            type="line"
            strokeLinecap="square"
            strokeWidth="15px"
            strokeColor="#f2c900"
            trailColor="#eee"
          />
        </div>
        <span>{star}</span>
      </div>
    );
  };

  render() {
    let { data } = this.props;
    console.log(data);
    let totalStars = data
      ? data.stars.fiveStars +
        data.stars.fourStars +
        data.stars.threeStars +
        data.stars.twoStars +
        data.stars.oneStars
      : 0;
    let fiveStarPercent = (data?.stars.fiveStars / totalStars) * 100;
    let fourStarPercent = (data?.stars.fourStars / totalStars) * 100;
    let threeStarPercent = (data?.stars.threeStars / totalStars) * 100;
    let twoStarPercent = (data?.stars.twoStars / totalStars) * 100;
    let oneStarPercent = (data?.stars.oneStars / totalStars) * 100;
    return (
      <div className="details-reviews">
        <div className="product-reviews">
          <div className="title">Ratings & Reviews of {data.name}</div>
          <div className="all-ratings-chart">
            {/* <Rate allowHalf defaultValue={1.7} disabled />           */}
            <div className="rate-avge-stars">
              <div className="ratings">
                <span className="ave-rate">
                  {parseFloat(data?.averageRating?.$numberDecimal).toFixed(1)}
                </span>{" "}
                / 5
              </div>
              <StarRatings
                rating={data?.stars?.averageStar}
                starDimension="40px"
                starSpacing="5px"
                starRatedColor="#f2c900"
                starEmptyColor="#eee"
              />
              <div className="total stars">{totalStars} ratings</div>
            </div>
            <div>
              {this.showStars(fiveStarPercent, 5, data.stars.fiveStars)}
              {this.showStars(fourStarPercent, 4, data.stars.fourStars)}
              {this.showStars(threeStarPercent, 3, data.stars.threeStars)}
              {this.showStars(twoStarPercent, 2, data.stars.twoStars)}
              {this.showStars(oneStarPercent, 1, data.stars.oneStars)}
            </div>
          </div>
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
