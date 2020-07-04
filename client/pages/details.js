import React, { Component } from "react";
import { Row, Col, Breadcrumb } from "antd";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import DetailSlider from "./Includes/Details/DetailSlider";
import ProductSpecs from "./Includes/Details/ProductSpecs";
import OtherDetails from "./Includes/Details/OtherDetails";

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
    );
  }
}

export default Details;
