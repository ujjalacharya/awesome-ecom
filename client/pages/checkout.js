import React, { Component } from "react";
import { Row, Col } from "antd";

//includes
import OrderSummary from "../src/Includes/Cart/OrderSummary";
import CartItems from "../src/Includes/Cart/CartItems";
import Layout from "../src/Components/Layout";
import { connect } from "react-redux";
import initialize from "../utils/initialize";
import actions from "../redux/actions";
import { getCookie } from "../utils/cookie";
import { getUserInfo } from "../utils/common";
import CheckoutItems from "../src/Includes/Cart/CheckoutItems";

class CheckoutCart extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    let loginToken = getCookie("token", ctx.req);
    let userInfo = getUserInfo(loginToken);

    if (userInfo?._id) {
      const userProfile = await ctx.store.dispatch(
        actions.getUserProfile(userInfo._id)
      );
    }

    const productReview = await ctx.store.dispatch(
      actions.getCartProducts("page=1", ctx)
    );
  }

  render() {
    return (
      <Layout title="Checkout">
        <section className="checkout">
          <div className="container">
            <Row>
              {/* <Col span={1}></Col> */}
              <Col md={16} xs={24}>
                <CheckoutItems
                  cartData={
                    this.props.cart.checkoutItems
                      ? this.props.cart.checkoutItems
                      : this.props.cart.getCartProducts
                  }
                  showCheckbox = "noCheckbox"
                />
              </Col>
              <Col md={8} xs={24}>
                <OrderSummary
                  orderTxt="PLACE ORDER"
                  showShippingAddress="showDisplay"
                  userData={this.props.user.userProfile}
                  checkoutItems={
                    this.props.cart.checkoutItems
                      ? this.props.cart.checkoutItems
                      : this.props.cart.getCartProducts
                  }
                />
              </Col>
              {/* <Col span={1}></Col> */}
            </Row>
          </div>
        </section>
      </Layout>
    );
  }
}

export default connect((state) => state, actions)(CheckoutCart);
