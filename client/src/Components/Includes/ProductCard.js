import React, { Component } from "react";
import { Tooltip } from "antd";

//includes
import QuickViewModal from "./QuickViewModal";
import Link from "next/link";
import ProductSpecs from "../../Includes/Details/ProductSpecs";
import next from "next";

const products = {
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
};
class ProductCard extends Component {
  state = {
    showQuickView: false,
    productData: products,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data && nextProps.data) {
      return {
        productData: nextProps.data,
      };
    }
    return null;
  }

  showModal = () => {
    this.setState({
      showQuickView: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      showQuickView: false,
    });
  };

  render() {
    const { productData } = this.state;

    let checkSkeleton = this.state.productData.name === "" ? true : false;
    return (
      <div className={"product-card " + (checkSkeleton && "skeleton")}>
        {this.state.showQuickView && (
          <QuickViewModal
            title="Quick View Product"
            visible={this.state.showQuickView}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            data={productData}
          />
        )}
        {/* <ReactTooltip place="top" type="dark" effect="float" /> */}
        <div className="product-box-shadow">
          <div className="hover-items-image">
            <div className="card-hover-items">
              <div className="card-items">
                {/* <a > ◕‿‿◕ </a> */}

                <Tooltip
                  placement="topLeft"
                  title="Quick View"
                  arrowPointAtCenter
                >
                  <img
                    src="/images/medical.png"
                    alt="medical.png"
                    onClick={this.showModal}
                  />
                </Tooltip>
              </div>
              <div className="card-items">
                <Tooltip
                  placement="topLeft"
                  title="Add to Cart"
                  arrowPointAtCenter
                >
                  <img src="/images/bag.png" alt="bag.jpg" />
                </Tooltip>
              </div>
              <div className="card-items">
                <Tooltip
                  placement="topLeft"
                  title="Add to Wishlist"
                  arrowPointAtCenter
                >
                  <img src="/images/heart.png" alt="heart.jpg" />
                </Tooltip>
              </div>
              <div className="card-items">
                <Tooltip
                  placement="topLeft"
                  title="Add to Compare"
                  arrowPointAtCenter
                >
                  <img src="/images/sliders.png" alt="slider.jpg" />
                </Tooltip>
              </div>
            </div>
            <Link
              href={`/products/[slug]`}
              key={productData.slug}
              as={`/products/${productData.slug}`}
            >
              <div className="image img-skeleton">
                <img
                  src={`${process.env.SERVER_BASE_URL}/uploads/${productData.images[0].medium}`}
                  // onError={(ev) => {
                  //   ev.target.src = "/images/default-image.png";
                  // }}
                  alt={productData.name}
                  className="productImg-loader"
                />
              </div>
            </Link>
          </div>

          <Link
            href={`/products/[slug]`}
            key={productData.slug}
            as={`/products/${productData.slug}`}
          >
            <div className="card-body">
              <div className="card-category small-line">
                <div className="cate">
                  {productData.category.map((cate, i) => {
                    return (
                      <span key={i}>
                        {cate.displayName}
                        {productData.category.length !== i + 1 && " - "}
                      </span>
                    );
                  })}
                </div>
                {!checkSkeleton && (
                  <div className="stars">
                    {productData.stars.averageStar &&
                      Array(productData.stars.averageStar)
                        .fill(0)
                        .map((num, i) => {
                          return (
                            <i className="fa fa-star" aria-hidden="true" key={i}></i>
                          );
                        })}
                  </div>
                )}
              </div>
              <div className="prod-name medium-line">{productData.name}</div>
              <div className="prod-price large-line">
                {!checkSkeleton && "Rs"} {productData.price}
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductCard;
