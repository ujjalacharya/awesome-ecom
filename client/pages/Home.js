import React, { Component } from "react";
import Header from "../src/Components/Header";
import MainCarousel from "../src/Components/Carousel";
import ProductSlider from "../src/Components/ProductSlider";
import SliderHeader from "../src/Components/SliderHeader";
import { Row, Col } from "antd";
import Popular from "../src/Components/Popular";
import LatestSLider from "../src/Components/LatestSlider";
import Footer from "../src/Components/Footer";

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="main-carousel">
          <MainCarousel />
        </div>
        <div className="container">
          <SliderHeader
            headTitle="Featured Products"
            headDetails="Quicksand is a sans serif type family of three weights plus matching
          obliques"
          />
          <ProductSlider />
          <section className="latest-popular">
            <Row>
              <Col lg={12} xs={24} md={12}>
                <Popular />
              </Col>
              <Col lg={12} xs={24} md={12}>
                <LatestSLider />
              </Col>
            </Row>
          </section>
          <SliderHeader
            headTitle="Trending Products"
            headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
            removePaddingTop="paddingTopZero"
          />
          <ProductSlider />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
