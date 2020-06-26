import React, {Component} from "react";

//includes
import ProductListView from "../../Components/ProductListView";

class CartItems extends Component {
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
            <span className="price">Cost: $ 5</span>
          </div>
        </div>
        <div className="bag-items">
          <div className="title">
            <h4>My Cart (1 Items)</h4>
            <div className="price">Total: $ 24</div>
          </div>
          <div className="items-list">
            <ProductListView />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItems;
