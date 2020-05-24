import React, { Component } from "react";
import Header from "../Components/Header";
import MainCarousel from "../Components/Carousel";
import ProductSlider from "../Components/ProductSlider";
import SliderHeader from "../Components/SliderHeader";
import { Row, Col } from "antd";
import Popular from "../Components/Popular";
import LatestSLider from "../Components/LatestSlider";
import Footer from "../Components/Footer";

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
              <Col lg={12} xs={24}>
                <Popular />
              </Col>
              <Col lg={12} xs={24}>
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
