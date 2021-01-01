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
import Link from "next/link";

class Details extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    if (ctx.isServer) {
      await ctx.store.dispatch(
        actions.getProductDetails(ctx.query.slug, ctx)
      );

      await ctx.store.dispatch(
        actions.getQandA(ctx.query.slug + "?page=1")
      );

      await ctx.store.dispatch(
        actions.getProductReviews(ctx.query.slug + "?page=1&perPage=10")
      );
    }

    // return {
    //   data,
    // };
  }

  // getBreadCrumbs = (obj) => {
  //   let values = Object.values(obj)
  //   console.log(values)
  //   values.forEach(val => {
  //     val && typeof val === "object" ? this.getBreadCrumbs(val) : ''
  //   })
  // }

  render() {
    let { productDetails } = this.props.products;
    // let breadcrumbs = this.getBreadCrumbs(productDetails?.product.category)
    return (
      <Layout title={productDetails?.product?.name}>
        <div className="wrapper">
          <section className="detail">
            <div className="container">
              <Row className="breadcrumb-all">
                <Col lg={24}>
                  <Breadcrumb>
                    <Breadcrumb.Item><Link href="/"><a>Home</a></Link></Breadcrumb.Item>
                    {/* {
                      productDetails.product.category[0].parent.parent &&
                      <Breadcrumb.Item>
                        <a>{productDetails.product.category[0].parent.parent.displayName}</a>
                      </Breadcrumb.Item>
                    } */}
                    {
                      productDetails.product.category[0].parent &&
                      <Breadcrumb.Item>
                        <Link href={`/category/${productDetails.product.category[0].parent.slug}/${productDetails.product.category[0].parent._id}`}><a>{productDetails.product.category[0].parent.displayName}</a></Link>
                      </Breadcrumb.Item>
                    }
                    {
                      productDetails.product.category[0].parent &&
                      <Breadcrumb.Item>
                        <a>{productDetails.product.category[0].displayName}</a>
                      </Breadcrumb.Item>
                    }
                  </Breadcrumb>
                </Col>
              </Row>
              {productDetails?.product && (
                <Row>
                  <Col lg={10} xs={24} md={24}>
                    <DetailSlider data={productDetails.product} />
                  </Col>
                  <Col lg={14} xs={24} md={18}>
                    <ProductSpecs data={productDetails} />
                  </Col>
                </Row>
              )}
              <Row>
                <Col lg={24}>
                  <OtherDetails data={productDetails} />
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
