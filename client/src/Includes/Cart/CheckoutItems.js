import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from "antd";

//includes
import actions from "../../../redux/actions";
import ProductListView from "../../Components/ProductListView";
import {
  getDiscountedPrice,
  scrollToTop,
  openNotification,
} from "../../../utils/common";
import { times } from "lodash";
import next from "next";

class CheckoutItems extends Component {
  state = {
    cardItems: [],
    inStockProducts: [],
    noStockProducts: [],
    perPage: 5,
  };

  componentDidMount() {
    if (this.props.cartData) {
      scrollToTop();
      // this.setState({
      //   cardItems: this.props.cartData,
      // });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.cartData !== prevState.listItems && nextProps.cartData) {
      return {
        listItems: nextProps.cartData,
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
    // if (
    //   this.props.order.placeOrderResp !== prevProps.order.placeOrderResp &&
    //   this.props.order.placeOrderResp
    // ) {
    //   openNotification("Success", "Order placed successfully");
    //   window.location.href = "/myprofile";
    // }
  }

  onChangePageInStock = (page) => {
    // this.setState({
    //   currentPage: page,
    // });
    // let body = {
    //   keyword: this.props.router.query.slug,
    // };
    // this.props.getCartProducts(`page=${page}`);

    // let allData = [...this.state.allinStockProducts.carts];

    let pageNum = (page - 1) * this.state.perPage;
    
    let newInStockProducts = {
      ...this.state.inStockProducts,
      carts: [...this.state.allinStockProducts.carts].slice(pageNum, (pageNum + this.state.perPage)),
    }
    
    this.setState({
      inStockProducts: newInStockProducts,
      currentPage: page,
    });
  };

  render() {
    return (
      <div className="cart-items">
        <div className="delivery-status">
          {/* <div className="delivery-free">
            <img src="/images/delivery-van.png" alt="delivery van" />
            You Have <b>Free Delivery</b> on this Order.
          </div> */}
          <div className="delivery-price">
            <span className="delivery-icon">
              <img src="/images/delivery-van.png" alt="delivery van" />
              <span>Standard Delivery</span>
            </span>

            {this.props.order?.getShippingChargeResp ? (
              <>
                <span className="delivery-date">Get By: 25 - 28 Aug 2019</span>
                <span className="price">
                  Cost: Rs {this.props.order?.getShippingChargeResp}
                </span>
              </>
            ) : (
              <span className="price">
                Please select the product to get the shipping charge
              </span>
            )}
          </div>
        </div>
        <div className="bag-items">
          <div className="title">
            <h4>My Cart ({this.state.listItems?.totalCount} Items)</h4>
            <div className="price">
              Total: Rs {this.props.cart.checkoutItems?.totalAmount || this.state.listItems?.totalAmount?.toFixed(2)}
            </div>
          </div>
          <div className="items-list">
            <ProductListView
              // data={this.state.cardItems}
              productsData={this.state.listItems}
              getCheckoutItems={this.props.getCheckoutItems}
              showCheckbox={this.props.showCheckbox}
            />
            {/* <div className="all-pagination">
              <Pagination
                defaultCurrent={1}
                pageSize={5}
                total={this.state.inStockProducts?.totalCount}
                onChange={this.onChangePageInStock}
                showLessItems={true}
              />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(CheckoutItems);
