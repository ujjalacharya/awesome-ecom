import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";

//includes
import ProductListView from "../../Components/ProductListView";
import { getDiscountedPrice } from "../../../utils/common";

class CartItems extends Component {
  state = {
    cardItems: [],
    totalAmount: ''
  };

  componentDidMount() {
    if (this.props.cart.getCartProducts) {
      let totalAmount = 0
      this.props.cart.getCartProducts.carts?.map(data => {
        totalAmount += (getDiscountedPrice(data.product.price, data.product.discountRate) * data.quantity)
      })
      this.setState({
        cardItems: this.props.cart.getCartProducts,
        totalAmount
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props, "did update");
  }

  render() {
    console.log(this.props);
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
            <ProductListView data = {this.state.cardItems} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(CartItems);
