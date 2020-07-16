import React, { Component } from "react";
import { Row, Col } from "antd";

//includes
import OrderSummary from "../src/Includes/Cart/OrderSummary";
import CartItems from "../src/Includes/Cart/CartItems";
import Layout from "../src/Components/Layout";

class Checkout extends Component {
  render() {
    return (
      <Layout title="checkout">
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
      </Layout>
    );
  }
}

export default Checkout;
