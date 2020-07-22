import React, { Component } from "react";
import Slider from "react-slick";
import PrevArrow from "../../Components/Includes/PrevArrow";
import NextArrow from "../../Components/Includes/NextArrow";
import ReactImageMagnify from "react-image-magnify";

class DetailSlider extends Component {
  state = {
    imageUrl:
      `${process.env.SERVER_BASE_URL}/uploads/${this.props.data?.images[0]?.medium}`,
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
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
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
                width: 800,
                height: 1000,
              },
            }}
          />
          {/* <ReactImageZoom {...props} /> */}
          {/* <img src={this.state.imageUrl} alt="main image" /> */}
        </div>
        <Slider {...settings} className="product-detail-slider">
          {
            this.props.data.images.map((imgs,i) => {
              return(
                <img
                  key={i}
                  src={`${process.env.SERVER_BASE_URL}/uploads/${imgs.thumbnail}`}
                  alt={this.props.data.name}
                  onClick={() => this.changeImage(`${process.env.SERVER_BASE_URL}/uploads/${imgs.large}`)}
                  className="prod-img"
                />
              )
            })
          }
        </Slider>
      </div>
    );
  }
}

export default DetailSlider;
