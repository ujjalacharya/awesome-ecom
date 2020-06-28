import React, { Component } from "react";
import { Row, Col, Breadcrumb } from "antd";
import Header from "../../src/Components/Header";
import Footer from "../../src/Components/Footer";
import DetailSlider from "../../src/Includes/Details/DetailSlider";

import ProductSpecs from "../../src/Includes/Details/ProductSpecs";
import OtherDetails from "../../src/Includes/Details/OtherDetails";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions";
import Layout from "../../src/Components/Layout";

class Details extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    const data = await ctx.store.dispatch(
      actions.getProductDetails(ctx.query.slug)
    );

    const menuData = await ctx.store.dispatch(
        actions.productCategories()
      );

    return {
      data,
    };
  }
  render() {
    
    return (
      <Layout title={this.props.data.name}>
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
              {this.props.data && (
                <Row>
                  <Col lg={10} xs={24} md={24}>
                    <DetailSlider data={this.props.data} />
                  </Col>
                  <Col lg={14} xs={24} md={18}>
                    <ProductSpecs data={this.props.data} />
                  </Col>
                </Row>
              )}
              <Row>
                <Col lg={24}>
                  <OtherDetails />
                </Col>
              </Row>
            </div>
          </section>
          <Footer />
        </div>
      </Layout>
    );
  }
}

export default Details;
