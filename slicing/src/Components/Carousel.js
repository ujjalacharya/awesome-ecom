import React, { Component } from "react";
import { Carousel, Button } from "antd";

// import Carousel from "nuka-carousel";

class MainCarousel extends Component {
  onChange = (a, b, c) => {
    console.log(a, b, c);
  };
  render() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true
      };
    return (
      <Carousel {...settings} autoplay>
        <div className="img-text">
          <div className="carousel-text">
            <h2>GET UPTO 60% OFF</h2>
            <div className="main-text">SUMMER SALE</div>
            <h4 className="sub-text">Limited items available at this Price</h4>
            <Button className="primary">Shop Now</Button>
          </div>
          <img src="/images/banner.jpg" />
        </div>
        <div className="img-text">
          <div className="carousel-text"></div>
          <img src="/images/carousel-img.jpg" />
        </div>
      </Carousel>
    );
  }
}

export default MainCarousel;
