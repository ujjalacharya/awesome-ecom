import React, { Component } from "react";
import Slider from "react-slick";

// includes
import PopularCard from "./PopularCard";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

class PopularSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      // autoplay:true,
      speed: 500,
      slidesToShow: 1,
      draggable: true,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };
    return (
      <section className="product-slider">
        <Slider {...settings}>
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
        </Slider>
      </section>
    );
  }
}

export default PopularSlider;
