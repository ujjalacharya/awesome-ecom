import React, { Component } from "react";

class Reviews extends Component {
  render() {
    return (
      <div className="details-reviews">
        <div className="title">Reviews</div>
        <div className="no-reviews">There are no reviews yet.</div>
        <div className="product-reviews">
          <div className="title">Product Reviews</div>
          <div className="all-reviews">
            <div className="user-review">
              <div className="review-stars">
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
              </div>
              <div className="reviewd-by">
                <div className="reivewer-name">by Manish S. - 28 May 2019</div>
                <div className="ver"><img src="/images/social-media.png" />Verified Purchase</div>
              </div>
              <div className="review-body">
                Very bad product. Steps recorded are incorrect. Doesn’t get
                charged. Horrible product . Waste of money.
              </div>
            </div>

            <div className="user-review">
              <div className="review-stars">
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
              </div>
              <div className="reviewd-by">
                <div className="reivewer-name">by Daraz Customer. - 04 Dec 2019</div>
                <div className="ver"><img src="/images/social-media.png" />Verified Purchase</div>
              </div>
              <div className="review-body">
                not so good product
              </div>
            </div>

            <div className="user-review">
              <div className="review-stars">
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
              </div>
              <div className="reviewd-by">
                <div className="reivewer-name">by Sobit P. - 16 May 2019</div>
                <div className="ver"><img src="/images/social-media.png" />Verified Purchase</div>
              </div>
              <div className="review-body">
                ok
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
