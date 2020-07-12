import React, { Component } from "react";
import { Input, Button, Popconfirm } from "antd";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { openNotification } from "../../../utils/common";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

class ProductSpecs extends Component {
  state = {
    pdQty: 1,
    showStatus: "More",
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.cart.addToCartResp !== prevProps.cart.addToCartResp &&
      this.props.cart.addToCartResp
    ) {
      openNotification("Success", "Product added to cart successfully");
      this.props.getProductDetails(this.props.router.query.slug);
    }

    if (
      this.props.wishlist.wishlistItemsResp !==
        prevProps.wishlist.wishlistItemsResp &&
      this.props.wishlist.wishlistItemsResp
    ) {
      openNotification("Success", "Product added to wishlist successfully");
      this.props.getProductDetails(this.props.router.query.slug);
    }

    if (
      this.props.wishlist.removeFromWishlistResp !==
        prevProps.wishlist.removeFromWishlistResp &&
      this.props.wishlist.removeFromWishlistResp
    ) {
      openNotification("Success", "Product removed from wishlist successfully");
      this.props.getProductDetails(this.props.router.query.slug);
    }

    if (
      this.props.cart.removeFromCartResp !==
        prevProps.cart.removeFromCartResp &&
      this.props.cart.removeFromCartResp
    ) {
      openNotification("Success", "Product removed from cart successfully");
      this.props.getProductDetails(this.props.router.query.slug);
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
    let {
      data: { product },
    } = this.props;

    let description = "";
    let allDescription = "";
    if (product.description) {
      allDescription = product.description.split(" ");
      if (this.state.showStatus === "More" && allDescription.length > 100) {
        let newRemarks = [...allDescription];
        description = newRemarks.splice(0, 95).join(" ") + "...";
      } else {
        description = product.description;
      }
    }

    let loginToken = this.props.authentication.token;
    return (
      <div className="product-specs">
        <div className="price-specs">
          <div className="product-title">{product.name}</div>
          <div className="ratings-reviews">
            <div className="ratings">
              {this.props.data.stars.averageStar &&
                Array(Math.round(this.props.data.stars.averageStar))
                  .fill(0)
                  .map((num, i) => {
                    return (
                      <i className="fa fa-star" aria-hidden="true" key={i}></i>
                    );
                  })}
              <span>
                {this.props.data.stars.averageStar
                  ? this.props.data.stars.averageStar.toFixed(1)
                  : 'No'}{" "}
                stars ratings
              </span>
            </div>
            <div className="reviews">
              <span>
                ( {this.props.data.stars.totalRatingUsers} customer reviews | 41
                FAQ answered )
              </span>
            </div>
          </div>
          <div className="price-wish">
            <div className="old-new-price">
              <div className="old-price">
                <span>Rs {product.price}</span>
              </div>
              <div className="new-price">
                <span className="price">
                  Rs {product.price - (product.price * 2) / 100}
                </span>
                <span className="discount">
                  (Save Rs {(product.price * 2) / 100} | {product.discountRate}
                  %)
                </span>
              </div>
            </div>
            <div className="wish-btn">
              {loginToken ? (
                this.props.data.hasOnWishlist ? (
                  <Popconfirm
                    title="Are you sure you want to remove this from wishlist?"
                    onConfirm={() =>
                      this.props.removeFromWishList(
                        this.props.data.hasOnWishlist._id
                      )
                    }
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>
                      <img
                        data-tip="Add to Wishlist"
                        src="/images/heart-blue.png"
                      />
                    </a>
                  </Popconfirm>
                ) : (
                  <img
                    data-tip="Add to Wishlist"
                    src="/images/heart.png"
                    onClick={() => this.props.addWishListItems(product.slug)}
                  />
                )
              ) : (
                <Link href={`/login?origin=${this.props.router.asPath}`}>
                  <a>
                    <img data-tip="Add to Wishlist" src="/images/heart.png" />
                  </a>
                </Link>
              )}
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
            {loginToken ? (
              !this.props.data.hasOnCart ? (
                <>
                  <div className="qty">
                    <span className="qty-title">Qty:</span>
                    <span className="qty-inc-dcs">
                      <i
                        aria-hidden="true"
                        onClick={() => this.changePdValue(-1)}
                        className={
                          "fa fa-minus " +
                          (this.state.pdQty === 1 ? "disabled" : "")
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
                </>
              ) : (
                <div className="delete-product">
                  <Popconfirm
                    title="Are you sure you want to remove this from cart?"
                    onConfirm={() =>
                      this.props.removeCart(this.props.data.hasOnCart._id)
                    }
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>
                      <Button className="btn">
                        <DeleteOutlined />
                        <span className="txt">REMOVE FROM CART</span>
                      </Button>
                    </a>
                  </Popconfirm>
                </div>
              )
            ) : (
              <Link href={`/login?origin=${this.props.router.asPath}`}>
                <a style={{ display: "flex", alignItems: "center" }}>
                  <div className="qty">
                    <span className="qty-title">Qty:</span>
                    <span className="qty-inc-dcs">
                      <i
                        aria-hidden="true"
                        // onClick={() => this.changePdValue(-1)}
                        className={
                          "fa fa-minus " +
                          (this.state.pdQty === 1 ? "disabled" : "")
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
                        // onClick={() => this.changePdValue(1)}
                      />
                    </span>
                  </div>

                  <Button className="primary">Add to Cart</Button>
                </a>
              </Link>
            )}
          </div>
          <div className="wish-comp-btn">
            <div className="comp-btn">
              <img data-tip="Add to Compare" src="/images/sliders.png" />
              <span>Add to Compare</span>
            </div>
          </div>
        </div>
        <div className="prod-cate-specs">
          <div className="tags">
            <b>Tags:</b>{" "}
            {product.tags.map((tag, i) => {
              return (
                <span key={i}>
                  {tag}
                  {product.tags.length !== i + 1 && ","}
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
