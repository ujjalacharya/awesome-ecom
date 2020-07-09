import React, { Component } from "react";
import Slider from "react-slick";

// includes
import ProductCard from "./Includes/ProductCard";
import PrevArrow from "./Includes/PrevArrow";
import NextArrow from "./Includes/NextArrow";
import { connect } from "react-redux";
import actions from "../../redux/actions";

class ProductSlider extends Component {
  state = {
    productData: {
      products: [
        {
          category: [
            {
              displayName: "",
              slug: "",
            },
          ],
          images: [
            {
              large: "/images/default-image.png",
              medium: "/images/default-image.png",
              thumbnail: "/images/default-image.png",
            },
          ],
          name: "",
          price: "",
        },
      ],
    },
  };

  componentDidMount() {
    if (this.props.products.latestProducts) {
      this.setState({
        productData: this.props.products.latestProducts,
      });
    }
  }

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
          {this.props.data?.products.map((product, i) => {
            return <ProductCard key={i} data={product} />;
          })}
        </Slider>
      </section>
    );
  }
}

export default connect((state) => state, actions)(ProductSlider);
