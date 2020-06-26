import React, { Component } from "react";
import Slider from "react-slick";

// includes
import ProductCard from "./Includes/ProductCard";
import PrevArrow from "./Includes/PrevArrow";
import NextArrow from "./Includes/NextArrow";

class ProductSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      // autoplay:true,
      speed: 500,
      slidesToShow: 4,
      draggable: true,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <section className="product-slider">
        <Slider {...settings}>
          {
            this.props.data.map(product => {
              return(
                <ProductCard data={product}/>
              )
            })
          }
        </Slider>
      </section>
    );
  }
}

export default ProductSlider;
