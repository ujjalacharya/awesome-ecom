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
import withPrivate from "../utils/auth/withPrivate";
import { isEmpty } from "lodash";
import Router from "next/router";

class CheckoutCart extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    if (ctx.isServer) {
      let cart = ctx.store.getState().cart.checkoutItems;
      if (isEmpty(cart)) {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: '/cart',
          });
          ctx.res.end();
        } else {
          Router.replace('/cart');
        }
      } else {
        let loginToken = getCookie("token", ctx.req);
        let userInfo = getUserInfo(loginToken);

        if (userInfo?._id) {
          await ctx.store.dispatch(
            actions.getUserProfile(userInfo._id, ctx)
          );
        }

        await ctx.store.dispatch(
          actions.getCartProducts("page=1", ctx)
        );
      }
    }

  }
  // componentDidMount(){
  //   if(isEmpty(this.props.cart.checkoutItems)){
  //     window.location.href = '/cart'
  //   }
  // }

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
                  showCheckbox="noCheckbox"
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

export default connect((state) => state, actions)(withPrivate(CheckoutCart));
