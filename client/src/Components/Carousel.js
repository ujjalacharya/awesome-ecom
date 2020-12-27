import React, { Component } from "react";
import { Carousel, Button } from "antd";
import { IMAGE_BASE_URL } from "../../utils/constants";

// import Carousel from "nuka-carousel";

class MainCarousel extends Component {
  onChange = (a, b, c) => {};
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
    };
    return (
      <Carousel {...settings}>
          {this.props.data?.banners &&
            this.props.data.banners.map((banner,i) => {
              return (
                <div className="img-text" key={i}>
                  <div className="carousel-text"></div>
                  <img src={IMAGE_BASE_URL+'/'+banner.bannerPhoto} alt="banner" />
                </div>
              );
            })}
      </Carousel>
    );
  }
}

export default MainCarousel;
