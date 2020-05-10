import React, { Component } from "react";
import Header from "../Components/Header";
import MainCarousel from "../Components/Carousel";
import ProductSlider from "../Components/ProductSlider";
import SliderHeader from "../Components/SliderHeader";
import { Row, Col } from "antd";
import Popular from "../Components/Popular";
import LatestSLider from "../Components/LatestSlider";

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="main-carousel">
          <MainCarousel />
        </div>
        <SliderHeader
          headTitle="Featured Products"
          headDetails="Quicksand is a sans serif type family of three weights plus matching
          obliques"
        />
        <ProductSlider />
        <section className="latest-popular">
          <Row>
            <Col span={12}>
              <Popular />
            </Col>
            <Col span={12}>
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
        Body
      </div>
    );
  }
}

export default Home;
