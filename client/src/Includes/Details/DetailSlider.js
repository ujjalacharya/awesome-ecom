import React, { Component, useState } from "react";
import Sliderss from "react-slick";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom } from 'pure-react-carousel';
import PrevArrow from "../../Components/Includes/PrevArrow";
import NextArrow from "../../Components/Includes/NextArrow";
import { IMAGE_BASE_URL } from "../../../utils/constants";
const baseImageUrl = IMAGE_BASE_URL

const DetailSlider = (props) => {
  // let [imageUrl, setImageUrl] = useState(`${baseImageUrl}/${props.data?.images[0]?.medium}`);
  // let [largeImageUrl, setLargeImageUrl] = useState(`${baseImageUrl}/${props.data?.images[0]?.large}`);
  let [curIndex, setCurIndex] = useState(0);

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
        totalSlides={props.data?.images.length}
        step={1}
        naturalSlideWidth={200}
        naturalSlideHeight={200}
        hasMasterSpinner
        lockOnWindowScroll
        currentSlide={curIndex}
      >
        <Slider>
          {
            props.data?.images?.map((image, index) => (
              <Slide key={index}>
                {
                  image._id === '1' ? <img src={image.medium} alt="img" /> :
                    <ImageWithZoom src={`${baseImageUrl}/${image.medium}`} srcZoomed={`${baseImageUrl}/${image.large}`} />
                }
              </Slide>
            ))
          }
        </Slider>
        {/* <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext> */}
      </CarouselProvider>

      <div className="thumbnail">
        {
          props.data?.images?.length >= 4 ?
            (
              <Sliderss {...settings}>
                {props.data?.images?.map((image, j) => {
                  return (
                    <img
                      key={j}
                      className={curIndex === j ? 'active' : ''}
                      src={`${baseImageUrl}/${image.thumbnail}`}
                      onClick={() => setCurIndex(j)}
                    />
                  );
                })}
              </Sliderss>
            ) : (
              props.data?.images?.map((image, j) => (
                image._id === '1' ?
                  <img src={image.thumbnail} alt="img" /> :
                  <img
                    key={j}
                    className={curIndex === j ? 'active' : ''}
                    src={`${baseImageUrl}/${image.thumbnail}`}
                    onClick={() => setCurIndex(j)}
                  />
              ))
            )
        }
      </div>
    </div>
  );
}

export default DetailSlider;
