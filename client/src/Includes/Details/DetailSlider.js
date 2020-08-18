import React, { Component } from "react";
import Slider from "react-slick";
import PrevArrow from "../../Components/Includes/PrevArrow";
import NextArrow from "../../Components/Includes/NextArrow";
import ReactImageMagnify from "react-image-magnify";
// import Magnifier from "react-magnifier";

const imageBaseUrl =
  "https://s3-us-west-1.amazonaws.com/react-package-assets/images/";
const images = [
  { name: "wristwatch_355.jpg", vw: "355w" },
  { name: "wristwatch_481.jpg", vw: "481w" },
  { name: "wristwatch_584.jpg", vw: "584w" },
  { name: "wristwatch_687.jpg", vw: "687w" },
  { name: "wristwatch_770.jpg", vw: "770w" },
  { name: "wristwatch_861.jpg", vw: "861w" },
  { name: "wristwatch_955.jpg", vw: "955w" },
  { name: "wristwatch_1033.jpg", vw: "1033w" },
  { name: "wristwatch_1112.jpg", vw: "1112w" },
  { name: "wristwatch_1192.jpg", vw: "1192w" },
  { name: "wristwatch_1200.jpg", vw: "1200w" }
];
class DetailSlider extends Component {
  state = {
    imageUrl: `${process.env.SERVER_BASE_URL}/uploads/${this.props.data?.images[0]?.medium}`,
    largeImageUrl: `${process.env.SERVER_BASE_URL}/uploads/${this.props.data?.images[0]?.large}`,
  };

  srcSet = () => {
    return images
      .map(image => {
        return `${imageBaseUrl}${image.name} ${image.vw}`;
      })
      .join(", ");
  }

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
      <div className="perimeter">
        <div className="image">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: `${this.state.imageUrl}`,
                // srcSet: this.srcSet,
                sizes:
                  "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
              },
              largeImage: {
                alt: "",
                src: `${this.state.largeImageUrl}`,
                width: 1200,
                height: 1800
              },
              isHintEnabled: true
            }}
          />
        </div>
      </div>
    );
  }
}

export default DetailSlider;
