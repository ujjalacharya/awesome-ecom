import React, { Component } from "react";
import { Row, Col } from "antd";

//includes
import OrderSummary from "./Includes/Cart/OrderSummary";
import CartItems from "./Includes/Cart/CartItems";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

class Checkout extends Component {
  render() {
    return (
      <>
        <Header />
        <section className="checkout">
          <div className="container">
            <Row>
              {/* <Col span={1}></Col> */}
              <Col md={16} xs={24}>
                <CartItems />
              </Col>
              <Col md={8} xs={24}>
                <OrderSummary
                  orderTxt="PLACE ORDER"
                  showShippingAddress="showDisplay"
                />
              </Col>
              {/* <Col span={1}></Col> */}
            </Row>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Checkout;
