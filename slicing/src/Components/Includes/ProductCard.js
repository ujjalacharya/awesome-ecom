import React, { Component } from "react";

class ProductCard extends Component {
  render() {
    return (
      <div className="product-card">
        <div className="hover-items-image">
          <div className="card-hover-items">
            <div className="card-items">
              <img src="/images/medical.png" />
            </div>
            <div className="card-items">
              <img src="/images/heart.png" />
            </div>
            <div className="card-items">
              <img src="/images/bag.png" />
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
    );
  }
}

export default ProductCard;
