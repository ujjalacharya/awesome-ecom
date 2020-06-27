import React, { Component } from "react";
import { Tooltip } from "antd";

//includes
import QuickViewModal from "./QuickViewModal";
import Link from "next/link";
import ProductSpecs from "../../Includes/Details/ProductSpecs";

class ProductCard extends Component {
  state = {
    showQuickView: false,
  };

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
    const { data } = this.props;

    return (
      <div className="product-card">
        {this.state.showQuickView && (
          <QuickViewModal
            title="Quick View Product"
            visible={this.state.showQuickView}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            data={data}
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
              key={data.slug}
              as={`/products/${data.slug}`}
            >
              <div className="image">
                <img
                  src={"http://localhost:3001/uploads/" + data.images[0].medium}
                  // onError={(ev) => {
                  //   ev.target.src =
                  //     "/images/prod-bag.jpg";
                  // }}
                  alt={data.name}
                />
              </div>
            </Link>
          </div>

          <Link
            href={`/products/[slug]`}
            key={data.slug}
            as={`/products/${data.slug}`}
          >
            <div className="card-body">
              <div className="card-category">
                <div className="cate">
                  {data.category.map((cate, i) => {
                    return (
                      <span key={i}>
                        {cate.displayName}
                        {data.category.length !== i + 1 && " - "}
                      </span>
                    );
                  })}
                </div>
                <div className="stars">
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>
              </div>
              <div className="prod-name">{data.name}</div>
              <div className="prod-price">Rs {data.price}</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductCard;
