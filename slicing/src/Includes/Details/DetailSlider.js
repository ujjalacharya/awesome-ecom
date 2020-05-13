import React, { useState, Component } from "react";
import Slider from "react-slick";
import PrevArrow from "../../Components/Includes/PrevArrow";
import NextArrow from "../../Components/Includes/NextArrow";
import ReactImageZoom from "react-image-zoom";
import ReactImageMagnify from "react-image-magnify";

class DetailSlider extends Component {
  state = {
    imageUrl: "/images/prod-bag.jpg",
  };

  changeImage = (url) => {
    this.setState({
      imageUrl: url,
    });
  };

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };
    // const props = {
    //   height: 500,
    //   scale: 0.5,
    //   zoomWidth: 500,
    //   img: this.state.imageUrl,
    // };
    return (
      <div className="slider">
        <div className="image-show">
          <ReactImageMagnify
            {...{
              enlargedImageContainerClassName: "enlargedImage",
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: this.state.imageUrl,
              },
              largeImage: {
                src: this.state.imageUrl,
                width: 1200,
                height: 1800,
              },
            }}
          />
          {/* <ReactImageZoom {...props} /> */}
          {/* <img src={this.state.imageUrl} alt="main image" /> */}
        </div>
        <Slider {...settings} className="product-detail-slider">
          <img
            src="/images/prod-bag.jpg"
            alt="product image"
            onClick={() => this.changeImage("/images/prod-bag.jpg")}
            className="prod-img"
          />
          <img
            src="/images/jacket.jpg"
            alt="product image"
            onClick={() => this.changeImage("/images/jacket.jpg")}
            className="prod-img"
          />
          <img
            src="/images/top-viewed-1.jpg"
            alt="product image"
            onClick={() => this.changeImage("/images/top-viewed-1.jpg")}
            className="prod-img"
          />
          <img
            src="/images/new-arrivals.jpg"
            alt="product image"
            onClick={() => this.changeImage("/images/new-arrivals.jpg")}
            className="prod-img"
          />
          <img
            src="/images/prod-bag-2.jpg"
            alt="product image"
            onClick={() => this.changeImage("/images/prod-bag-2.jpg")}
            className="prod-img"
          />
          <img
            src="/images/prod-bag-3.jpg"
            alt="product image"
            onClick={() => this.changeImage("/images/prod-bag-3.jpg")}
            className="prod-img"
          />
        </Slider>
      </div>
    );
  }
}

export default DetailSlider;
