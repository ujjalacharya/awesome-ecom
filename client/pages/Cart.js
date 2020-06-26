import React, { Component } from "react";
import { Row, Col } from "antd";

//includes
import CartItems from "./Includes/Cart/CartItems";
import OrderSummary from "./Includes/Cart/OrderSummary";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

class Cart extends Component {
  render() {
    return (
      <>
        <Header />
        <section className="cart-page">
          <div className="container">
            <Row>
              <Col md={0} xs={0}></Col>
              <Col md={16} xs={24}>
                <CartItems />
              </Col>
              <Col md={8} xs={24}>
                <OrderSummary orderTxt="PROCCED TO CHECKOUT" />
              </Col>
              <Col md={0} xs={0}></Col>
            </Row>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Cart;
