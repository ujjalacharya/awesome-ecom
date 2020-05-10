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
      //   <Carousel>
      //     <div className="img-text">
      //       <div className="carousel-text">
      //         <h2>GET UPTO 60% OFF</h2>
      //         <div className="main-text">SUMMER SALE</div>
      //         <h4 className="sub-text"></h4>
      //         <Button>Shop Now</Button>
      //       </div>
      //       <img src="/images/banner.jpg" />
      //     </div>
      //     <div className="img-text">
      //       <div className="carousel-text">
      //       </div>
      //         <img src="/images/carousel-img.jpg" />
      //     </div>
      //   </Carousel>
      <Carousel {...settings}>
        <div className="img-text">
          <div className="carousel-text">
            <h2>GET UPTO 60% OFF</h2>
            <div className="main-text">SUMMER SALE</div>
            <h4 className="sub-text"></h4>
            <Button>Shop Now</Button>
          </div>
          <img src="/images/banner.jpg" />
        </div>
        <div className="img-text">
          <div className="carousel-text"></div>
          <img src="/images/carousel-img.jpg" />
        </div>
        {/* <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div> */}
      </Carousel>
    );
  }
}

export default MainCarousel;
