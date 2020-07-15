import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from "antd";

//includes
import actions from "../../../redux/actions";
import ProductListView from "../../Components/ProductListView";
import { getDiscountedPrice, scrollToTop } from "../../../utils/common";

class CartItems extends Component {
  state = {
    cardItems: [],
    totalAmount: "",
  };

  componentDidMount() {
    if (this.props.cart.getCartProducts) {
      scrollToTop();
      let totalAmount = 0;
      this.props.cart.getCartProducts.carts?.map((data) => {
        totalAmount +=
          getDiscountedPrice(
            data.product.price.$numberDecimal,
            data.product.discountRate
          ) * data.quantity;
      });
      this.setState({
        cardItems: this.props.cart.getCartProducts,
        totalAmount,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.cart.getCartProducts !== prevState.cardItems) {
      let totalAmount = 0;
      nextProps.cart.getCartProducts.carts?.map((data) => {
        totalAmount +=
          getDiscountedPrice(
            data.product.price.$numberDecimal,
            data.product.discountRate
          ) * data.quantity;
      });
      return {
        cardItems: nextProps.cart.getCartProducts,
        totalAmount,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.cart.getCartProducts !== prevProps.cart.getCartProducts &&
      this.props.cart.getCartProducts
    ) {
      scrollToTop();
    }
  }

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
    // let body = {
    //   keyword: this.props.router.query.slug,
    // };
    this.props.getCartProducts(`page=${page}`);
  };

  render() {
    return (
      <div className="cart-items">
        <div className="delivery-status">
          <div className="delivery-free">
            <img src="/images/delivery-van.png" alt="delivery van" />
            You Have <b>Free Delivery</b> on this Order.
          </div>
          <div className="delivery-price">
            <span className="delivery-icon">
              <img src="/images/delivery-van.png" alt="delivery van" />
              <span>Standard Delivery</span>
            </span>
            <span className="delivery-date">Get By: 25 - 28 Aug 2019</span>
            <span className="price">Cost: Rs 5</span>
          </div>
        </div>
        <div className="bag-items">
          <div className="title">
            <h4>My Cart ({this.state.cardItems?.totalCount} Items)</h4>
            <div className="price">Total: Rs {this.state.totalAmount}</div>
          </div>
          <div className="items-list">
            <ProductListView data={this.state.cardItems} />
            <div className="all-pagination">
              <Pagination
                defaultCurrent={1}
                pageSize = {5}
                total={this.state.cardItems?.totalCount}
                onChange={this.onChangePage}
                showLessItems = {true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(CartItems);
