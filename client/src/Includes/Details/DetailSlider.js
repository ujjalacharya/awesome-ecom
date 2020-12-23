import React, { Component } from "react";
import Sliderss from "react-slick";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom } from 'pure-react-carousel';
import PrevArrow from "../../Components/Includes/PrevArrow";
import NextArrow from "../../Components/Includes/NextArrow";
import { IMAGE_BASE_URL } from "../../../utils/constants";
const baseImageUrl = IMAGE_BASE_URL
class DetailSlider extends Component {
  state = {
    imageUrl: `${baseImageUrl}/${this.props.data?.images[0]?.medium}`,
    largeImageUrl: `${baseImageUrl}/${this.props.data?.images[0]?.large}`,
    curIndex: 0
  };

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
      <div className="det-slider">
        <CarouselProvider
          visibleSlides={1}
          totalSlides={this.props.data?.images.length}
          step={1}
          naturalSlideWidth={200}
          naturalSlideHeight={200}
          hasMasterSpinner
          lockOnWindowScroll
          currentSlide={this.state.curIndex}
        >
          <Slider>
            {
              this.props.data?.images?.map((image, index) => (
                <Slide index={index}>
                  <ImageWithZoom src={`${baseImageUrl}/${image.large}`} />
                </Slide>
              ))
            }
          </Slider>
          {/* <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext> */}
        </CarouselProvider>

        <div className="thumbnail">
          {
            this.props.data?.images?.length >= 4 ?
              (
                <Sliderss {...settings}>
                  {this.props.data?.images?.map((image, j) => {
                    return (
                      <img
                        key={j}
                        className={this.state.curIndex === j ? 'active' : ''}
                        src={`${baseImageUrl}/${image.thumbnail}`}
                        onClick={() => this.setState({ curIndex: j })}
                      />
                    );
                  })}
                </Sliderss>
              ) : (
                this.props.data?.images?.map((image, j) => {
                  return (
                    <img
                      key={j}
                      className={this.state.curIndex === j ? 'active' : ''}
                      src={`${baseImageUrl}/${image.thumbnail}`}
                      onClick={() => this.setState({ curIndex: j })}
                    />
                  );
                })
              )
          }
        </div>
      </div>
    );
  }
}

export default DetailSlider;
