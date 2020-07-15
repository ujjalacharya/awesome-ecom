import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { withRouter } from "next/router";

//includes
import CartItems from "../src/Includes/Cart/CartItems";
import OrderSummary from "../src/Includes/Cart/OrderSummary";
import Layout from "../src/Components/Layout";
import initialize from "../utils/initialize";
import actions from "../redux/actions";

class Cart extends Component {
  state = {
    checkoutItems : []
  }

  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    const productReview = await ctx.store.dispatch(
      actions.getCartProducts("page=1", ctx)
    );
  }

  getCheckoutItems = (items) => {
    this.setState({
      checkoutItems: items
    })
  }

  render() {
    return (
      <Layout title="Cart">
        <section className="cart-page">
          <div className="container">
            <Row>
              <Col md={0} xs={0}></Col>
              <Col md={16} xs={24}>
                <CartItems getCheckoutItems={this.getCheckoutItems} />
              </Col>
              <Col md={8} xs={24}>
                <OrderSummary orderTxt="PROCCED TO CHECKOUT" checkoutItems={this.state.checkoutItems} />
              </Col>
              <Col md={0} xs={0}></Col>
            </Row>
          </div>
        </section>
      </Layout>
    );
  }
}

export default connect((state) => state)(Cart);
