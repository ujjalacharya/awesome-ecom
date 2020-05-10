import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

class ProductCard extends Component {
  render() {
    return (
      <div className="product-card">
        <ReactTooltip place="top" type="dark" effect="float" />
        <div className="product-box-shadow">
          <div className="hover-items-image">
            <div className="card-hover-items">
              <div className="card-items">
                {/* <a > ◕‿‿◕ </a> */}
                <img data-tip="Quick View" src="/images/medical.png" />
              </div>
              <div className="card-items">
                <img data-tip="Add to Cart" src="/images/bag.png" />
              </div>
              <div className="card-items">
                <img data-tip="Add to Wishlist" src="/images/heart.png" />
              </div>
              <div className="card-items">
                <img data-tip="Add to Compare" src="/images/sliders.png" />
              </div>
            </div>
            <div className="image">
              <img src="/images/prod-bag.jpg" />
            </div>
          </div>
          <div className="card-body">
            <div className="card-category">
              <div className="cate">Mens - Bags - Black</div>
              <div className="stars">
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
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
