import React, { Component } from "react";
import { Input, Button } from "antd";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { openNotification } from "../../../utils/common";

class ProductSpecs extends Component {
  state = {
    pdQty: 1,
    showStatus: "More",
  };

  componentDidUpdate(prevProps){
    if(this.props.cart.addToCartResp !== prevProps.cart.addToCartResp && this.props.cart.addToCartResp){
      openNotification('Success', 'Product added to cart successfully')
    }
  }

  changePdValue = (num) => {
    let newPdQty = parseInt(this.state.pdQty) + num;
    if (newPdQty >= 1) {
      this.setState({
        pdQty: newPdQty,
      });
    }
  };

  changeViewStatus = () => {
    if (this.state.showStatus === "More") {
      this.setState({
        showStatus: "Less",
      });
    } else {
      this.setState({
        showStatus: "More",
      });
    }
  };

  addToCart = () => {
    this.props.addToCart(this.props.router.query.slug, {
      quantity: this.state.pdQty,
    });
  };

  render() {
    let { data } = this.props;

    let description = "";
    let allDescription = "";
    if (data.description) {
      allDescription = data.description.split(" ");
      if (this.state.showStatus === "More" && allDescription.length > 100) {
        let newRemarks = [...allDescription];
        description = newRemarks.splice(0, 95).join(" ") + "...";
      } else {
        description = data.description;
      }
    }
    return (
      <div className="product-specs">
        <div className="price-specs">
          <div className="product-title">{data.name}</div>
          <div className="ratings-reviews">
            <div className="ratings">
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <span>5 start ratings</span>
            </div>
            <div className="reviews">
              <span>( 184 customer reviews | 41 FAQ answered )</span>
            </div>
          </div>
          <div className="old-new-price">
            <div className="old-price">
              <span>{data.price}</span>
            </div>
            <div className="new-price">
              <span className="price">
                {data.price - (data.price * 2) / 100}
              </span>
              <span className="discount">
                (Save {(data.price * 2) / 100} | {data.discountRate}%)
              </span>
            </div>
          </div>
        </div>
        <div className="specs">
          <div className="spec-details">
            {description}
            {allDescription.length > 100 && (
              <div className="text-center">
                <a onClick={this.changeViewStatus} className="view-more-less">
                  View {this.state.showStatus}{" "}
                  <i className="fa fa-caret-down"></i>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="qty-cart-btn">
          <div className="qty-cart">
            <div className="qty">
              <span className="qty-title">Qty:</span>
              <span className="qty-inc-dcs">
                <i
                  aria-hidden="true"
                  onClick={() => this.changePdValue(-1)}
                  className={
                    "fa fa-minus " + (this.state.pdQty === 1 ? "disabled" : "")
                  }
                />
                <Input
                  defaultValue={this.state.pdQty}
                  value={this.state.pdQty}
                  onChange={(e) => {
                    this.setState({ pdQty: e.target.value });
                  }}
                />
                <i
                  className="fa fa-plus"
                  aria-hidden="true"
                  onClick={() => this.changePdValue(1)}
                />
              </span>
            </div>

            <Button className="primary" onClick={this.addToCart}>
              Add to Cart
            </Button>
          </div>
          <div className="wish-comp-btn">
            <div className="wish-btn">
              <img data-tip="Add to Wishlist" src="/images/heart.png" />
              <span>Add to Wishlist</span>
            </div>
            <div className="comp-btn">
              <img data-tip="Add to Compare" src="/images/sliders.png" />
              <span>Add to Compare</span>
            </div>
          </div>
        </div>
        <div className="prod-cate-specs">
          <div className="tags">
            <b>Tags:</b>{" "}
            {data.tags.map((tag, i) => {
              return (
                <span key={i}>
                  {tag}
                  {data.tags.length !== i + 1 && ","}
                </span>
              );
            })}
          </div>
          <div className="share">
            <b>Share this product:</b>
            <span>
              <i className="fa fa-facebook" aria-hidden="true"></i>
              <i className="fa fa-instagram" aria-hidden="true"></i>
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(ProductSpecs));
