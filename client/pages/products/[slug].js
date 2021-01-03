import React, { useEffect, useRef } from "react";
import { Row, Col, Breadcrumb } from "antd";

// includes
import DetailSlider from "../../src/Includes/Details/DetailSlider";
import ProductSpecs from "../../src/Includes/Details/ProductSpecs";
import OtherDetails from "../../src/Includes/Details/OtherDetails";
import Layout from "../../src/Components/Layout";

//utils
import initialize from "../../utils/initialize";

// next router
import { withRouter } from "next/router";
import Link from "next/link";

// redux
import actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { previousQuery } from "../../utils/common";

// function previousQuery(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const Details = (props) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.products.productDetails)

  let { query } = props.router;
  let prevQuery = previousQuery(query.slug)

  useEffect(() => {
    if (
      !props.isServer &&
      prevQuery !== query.slug
    ) {
      dispatch(actions.getProductDetails(query.slug));
    }
  }, [dispatch, query.slug])

  useEffect(() => {
    dispatch(actions.getQandA(query.slug + "?page=1"));
    dispatch(actions.getProductReviews(query.slug + "?page=1&perPage=10"));
  }, [])

  return (
    <Layout title={productDetails?.product?.name}>
      <div className="wrapper">
        <section className="detail">
          <div className="container">
            <Row className="breadcrumb-all">
              <Col lg={24}>
                <Breadcrumb>
                  <Breadcrumb.Item><Link href="/"><a>Home</a></Link></Breadcrumb.Item>
                  {
                    productDetails?.product.category[0].parent &&
                    <Breadcrumb.Item>
                      <Link href={`/category/${productDetails.product.category[0].parent.slug}/${productDetails.product.category[0].parent._id}`}><a>{productDetails.product.category[0].parent.displayName}</a></Link>
                    </Breadcrumb.Item>
                  }
                  {
                    productDetails?.product.category[0].parent &&
                    <Breadcrumb.Item>
                      <a>{productDetails?.product.category[0].displayName}</a>
                    </Breadcrumb.Item>
                  }
                </Breadcrumb>
              </Col>
            </Row>
            {productDetails?.product && (
              <Row>
                <Col lg={10} xs={24} md={24}>
                  <DetailSlider data={productDetails?.product} />
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

Details.getInitialProps = async (ctx) => {
  initialize(ctx);

  if (ctx.isServer) {
    await ctx.store.dispatch(
      actions.getProductDetails(ctx.query.slug, ctx)
    );
  }
  return {
    isServer: ctx.isServer
  }

}

export default withRouter(Details)
