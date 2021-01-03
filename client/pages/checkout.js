import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { Row, Col } from "antd";

//includes
import Layout from "../src/Components/Layout";
import OrderSummary from "../src/Includes/Cart/OrderSummary";
import CheckoutItems from "../src/Includes/Cart/CheckoutItems";

// utils
import initialize from "../utils/initialize";
import withPrivate from "../utils/auth/withPrivate";
import { getCookieFromBrowser } from "../utils/cookie";
import { getUserInfo } from "../utils/common";

// next router
import Router from "next/router";

// redux
import actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const CheckoutCart = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state => state.cart))
  const user = useSelector((state => state.user))

  let loginToken = getCookieFromBrowser('token');
  let userInfo = getUserInfo(loginToken);

  useEffect(() => {
    if (!props.isServer) {
      if (userInfo?._id) {
        dispatch(
          actions.getUserProfile(userInfo._id)
        );
      }
    }
  }, [])
  return (
    <Layout title="Checkout">
      <section className="checkout">
        <div className="container">
          <Row>
            {/* <Col span={1}></Col> */}
            <Col md={16} xs={24}>
              <CheckoutItems
                cartData={
                  cart.checkoutItems
                    ? cart.checkoutItems
                    : cart.getCartProducts
                }
                showCheckbox="noCheckbox"
              />
            </Col>
            <Col md={8} xs={24}>
              <OrderSummary
                orderTxt="PLACE ORDER"
                showShippingAddress="showDisplay"
                userData={user.userProfile}
                checkoutItems={
                  cart.checkoutItems
                    ? cart.checkoutItems
                    : cart.getCartProducts
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

CheckoutCart.getInitialProps = async (ctx) => {
  initialize(ctx);

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
    }
  }
  return {
    isServer: ctx.isServer
  }
}

export default withPrivate(CheckoutCart);
