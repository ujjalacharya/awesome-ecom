import React, { Component } from "react";
import { Tooltip } from "antd";

class ProductCard extends Component {
  render() {
    return (
      <div className="product-card">
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
                  <img src="/images/medical.png" alt="medical.png"/>
                </Tooltip>
              </div>
              <div className="card-items">
                <Tooltip
                  placement="topLeft"
                  title="Add to Cart"
                  arrowPointAtCenter
                >
                  <img src="/images/bag.png" alt="bag.jpg"/>
                </Tooltip>
              </div>
              <div className="card-items">
                <Tooltip
                  placement="topLeft"
                  title="Add to Wishlist"
                  arrowPointAtCenter
                >
                  <img src="/images/heart.png" alt="heart.jpg"/>
                </Tooltip>
              </div>
              <div className="card-items">
                <Tooltip
                  placement="topLeft"
                  title="Add to Compare"
                  arrowPointAtCenter
                >
                  <img src="/images/sliders.png" alt="slider.jpg"/>
                </Tooltip>
              </div>
            </div>
            <div className="image">
              <img src="/images/prod-bag.jpg" alt="prod-bag.jpg"/>
            </div>
          </div>
          <div className="card-body">
            <div className="card-category">
              <div className="cate">Mens - Bags - Black</div>
              <div className="stars">
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
              </div>
            </div>
            <div className="prod-name">Auctor Sem Argu</div>
            <div className="prod-price">Rs 1500</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
