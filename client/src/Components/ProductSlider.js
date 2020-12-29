import React, { Component } from "react";
import Slider from "react-slick";

// includes
import ProductCard from "./Includes/ProductCard";
import PrevArrow from "./Includes/PrevArrow";
import NextArrow from "./Includes/NextArrow";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import { openNotification } from "../../utils/common";

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

  componentDidUpdate(prevProps) {
    if (
      this.props.cart.addToCartResp !== prevProps.cart.addToCartResp &&
      this.props.cart.addToCartResp
    ) {
      // this.props.getLatestProducts();
    }

    if (
      this.props.wishlist.wishlistItemsResp?.updatedAt !==
        prevProps.wishlist.wishlistItemsResp?.updatedAt &&
      this.props.wishlist.wishlistItemsResp
    ) {
      // this.props.getLatestProducts();
    }

    if (
      this.props.wishlist.removeFromWishlistResp?.updatedAt !==
        prevProps.wishlist.removeFromWishlistResp?.updatedAt &&
      this.props.wishlist.removeFromWishlistResp
    ) {
      // this.props.getLatestProducts();
    }

    if (
      this.props.cart.removeFromCartResp !==
        prevProps.cart.removeFromCartResp &&
      this.props.cart.removeFromCartResp
    ) {
      // this.props.getLatestProducts();
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
          {this.props.data?.products?.map((product, i) => {
            return <ProductCard key={i} data={product} sliderName={this.props.sliderName} />;
          })}
        </Slider>
      </section>
    );
  }
}

export default connect((state) => state, actions)(ProductSlider);
