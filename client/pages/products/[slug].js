import React, { Component } from "react";
import { Row, Col, Breadcrumb } from "antd";
import DetailSlider from "../../src/Includes/Details/DetailSlider";

import ProductSpecs from "../../src/Includes/Details/ProductSpecs";
import OtherDetails from "../../src/Includes/Details/OtherDetails";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions";
import Layout from "../../src/Components/Layout";
import { withRouter } from "next/router";
import { connect } from "react-redux";

class Details extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    const data = await ctx.store.dispatch(
      actions.getProductDetails(ctx.query.slug)
    );

    const qa = await ctx.store.dispatch(
      actions.getQandA(ctx.query.slug+"?page=1&perPage=10")
    );

    const productReview = await ctx.store.dispatch(
      actions.getProductReviews(ctx.query.slug+"?page=1&perPage=10")
    );

    // return {
    //   data,
    // };
  }
  render() {
    console.log(this.props)
    return (
      <Layout title={this.props.products?.productDetails?.product?.name}>
        <div className="wrapper">
          <section className="detail">
            <div className="container">
              <Row className="breadcrumb-all">
                <Col lg={24}>
                  <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="">Mens</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="">Prod Bag</a>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              {this.props.products.productDetails?.product && (
                <Row>
                  <Col lg={10} xs={24} md={24}>
                    <DetailSlider data={this.props.products.productDetails.product} />
                  </Col>
                  <Col lg={14} xs={24} md={18}>
                    <ProductSpecs data={this.props.products.productDetails.product} />
                  </Col>
                </Row>
              )}
              <Row>
                <Col lg={24}>
                  <OtherDetails data = {this.props.products?.productDetails.product} />
                </Col>
              </Row>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default connect((state) => state)(withRouter(Details));
