import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

// redux
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";

//includes
import CartItems from "../src/Includes/Cart/CartItems";
import OrderSummary from "../src/Includes/Cart/OrderSummary";
import Layout from "../src/Components/Layout";

// utils
import initialize from "../utils/initialize";
import { getCookieFromBrowser, getCookie } from "../utils/cookie";
import { getUserInfo } from "../utils/common";
import withPrivate from "../utils/auth/withPrivate";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state => state.cart))

  let [checkoutItems, setCheckoutItems] = useState([])

  const getCheckoutItems = (items) => {
    setCheckoutItems(items)
  }
  let loginToken = getCookieFromBrowser('token');
  let userInfo = getUserInfo(loginToken);

  useEffect(() => {
    if(!props.isServer){
      if (userInfo?._id) {
        dispatch(
          actions.getUserProfile(userInfo._id)
        );
      }
  
      dispatch(
        actions.getCartProducts("page=1")
      );
    }
  }, [])

  return (
    <Layout title="Cart">
      <section className="cart-page">
        <div className="container">
          <Row>
            <Col md={0} xs={0}></Col>
            <Col md={16} xs={24}>
              <CartItems 
                getCheckoutItems={getCheckoutItems} 
                cartData={cart.directBuyItems || cart.getCartProducts}
                showCheckbox="" 
              />
            </Col>
            <Col md={8} xs={24}>
              <OrderSummary 
                orderTxt="PROCCED TO CHECKOUT" 
                checkoutItems={checkoutItems} 
                diableOrderBtn={!checkoutItems.length && 'disableBtn'} 
              />
            </Col>
            <Col md={0} xs={0}></Col>
          </Row>
        </div>
      </section>
    </Layout>
  );
}

Cart.getInitialProps = async(ctx) => {
  initialize(ctx);

  if (ctx.isServer) {
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

  return{
    isServer: ctx.isServer
  }
}

export default withPrivate(Cart);
