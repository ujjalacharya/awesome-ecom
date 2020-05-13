import React, { Component } from "react";
import { Row, Col, Breadcrumb } from "antd";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DetailSlider from "../Includes/Details/DetailSlider";

class Details extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
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
            <Row>
              <Col lg={10} xs={24} md={24}>
                <DetailSlider />
              </Col>
              <Col lg={10} xs={24} md={18}>
                {/* <ProductSpecs /> */}
              </Col>
              <Col lg={4} xs={24} md={6}>
                {/* <DeliveryOptions /> */}
              </Col>
            </Row>
            {/* <SimilarOccasion /> */}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Details;
