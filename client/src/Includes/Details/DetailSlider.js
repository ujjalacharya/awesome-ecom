import React, { Component } from "react";
import Slider from "react-slick";
import PrevArrow from "../../Components/Includes/PrevArrow";
import NextArrow from "../../Components/Includes/NextArrow";
import ReactImageMagnify from "react-image-magnify";
// import Magnifier from "react-magnifier";

class DetailSlider extends Component {
  state = {
    imageUrl: `${process.env.SERVER_BASE_URL}/uploads/${this.props.data?.images[0]?.medium}`,
    largeImageUrl: `${process.env.SERVER_BASE_URL}/uploads/${this.props.data?.images[0]?.large}`,
  };

  changeImage = (url, largeUrl) => {
    this.setState({
      imageUrl: url,
      largeImageUrl: largeUrl,
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
    return (
      <div className="slider">
        <div className="image-show">
          {/* <Magnifier
            src={this.state.largeImageUrl}
            width={500}
            height={400}
            mgShape="square"
            mgWidth={150}
            mgHeight={150}
            zoomFactor={1.5}
          /> */}
          <ReactImageMagnify
            {...{
              enlargedImageContainerClassName: "enlargedImage",
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                // isFluidWidth: true,
                src: this.state.imageUrl,
                // sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                width: 500,
                height: 400
              },
              largeImage: {
                src: this.state.largeImageUrl,
                width: 1000,
                height: 1400,
              },
              enlargedImageContainerDimensions: {
                width: '100%',
                height: '100%'
            }
            }}
          />
          {/* <img src={this.state.imageUrl} alt="main image" /> */}
        </div>
        {this.props.data.images.length > 4 ? (
          <Slider {...settings} className="product-detail-slider">
            {this.props.data.images.map((imgs, i) => {
              return (
                <img
                  key={i}
                  src={`${process.env.SERVER_BASE_URL}/uploads/${imgs.thumbnail}`}
                  alt={this.props.data.name}
                  onClick={() =>
                    this.changeImage(
                      `${process.env.SERVER_BASE_URL}/uploads/${imgs.medium}`,
                      `${process.env.SERVER_BASE_URL}/uploads/${imgs.large}`
                    )
                  }
                  className="prod-img"
                />
              );
            })}
          </Slider>
        ) : (
          <div className="product-detail-slider">
            {this.props.data.images.map((imgs, i) => {
              return (
                <img
                  key={i}
                  src={`${process.env.SERVER_BASE_URL}/uploads/${imgs.thumbnail}`}
                  alt={this.props.data.name}
                  onClick={() =>
                    this.changeImage(
                      `${process.env.SERVER_BASE_URL}/uploads/${imgs.medium}`,
                      `${process.env.SERVER_BASE_URL}/uploads/${imgs.large}`
                    )
                  }
                  className="prod-img"
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DetailSlider;
