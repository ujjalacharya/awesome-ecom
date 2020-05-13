import React, { Component } from "react";
import { Input, Button } from "antd";

class ProductSpecs extends Component {
  state = {
    pdQty: 1,
  };

  changePdValue = (num) => {
    let newPdQty = parseInt(this.state.pdQty) + num;
    if (newPdQty >= 1) {
      this.setState({
        pdQty: newPdQty,
      });
    }
  };
  render() {
    return (
      <div className="product-specs">
        <div className="price-specs">
          <div className="product-title">Item name / Bundle name</div>
          <div className="ratings-reviews">
            <div className="ratings">
              <i class="fa fa-star-o" aria-hidden="true"></i>
              <i class="fa fa-star-o" aria-hidden="true"></i>
              <i class="fa fa-star-o" aria-hidden="true"></i>
              <i class="fa fa-star-o" aria-hidden="true"></i>
              <i class="fa fa-star-o" aria-hidden="true"></i>
              <span>5 start ratings</span>
            </div>
            <div className="reviews">
              <span>( 184 customer reviews | 41 FAQ answered )</span>
            </div>
          </div>
          <div className="old-new-price">
            <div className="old-price">
              <span>$45.00</span>
            </div>
            <div className="new-price">
              <span className="price">$38.00</span>
              <span className="discount">(Save $7 | 15%)</span>
            </div>
          </div>
        </div>
        <div className="specs">
          <div className="spec-details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
            justo id massa bibendum faucibus. Nam non enim mollis, mollis felis
            eu, gravida turpis. Donec cursus sagittis semper. Nunc mattis nulla
            aliquam enim mollis iaculis. Nullam feugiat eleifend augue nec
            malesuada. Vivamus at arcu posuere, volutpat purus non, dignissim
            arcu.
          </div>
        </div>
        <div className="qty-cart-btn">
            <div className="qty-cart">
            <div className="qty">
                <span className="qty-title">Qty:</span>
                <span className="qty-inc-dcs">
                <i
                    aria-hidden="true"
                    onClick={() => this.changePdValue(-1)}
                    className={
                    "fa fa-minus " + (this.state.pdQty === 1 ? "disabled" : "")
                    }
                />
                <Input
                    defaultValue={this.state.pdQty}
                    value={this.state.pdQty}
                    onChange={(e) => {
                    this.setState({ pdQty: e.target.value });
                    }}
                />
                <i
                    class="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => this.changePdValue(1)}
                />
                </span>
            </div>

            <Button className="primary">Add to Cart</Button>
            </div>
            <div className="wish-comp-btn">
            <div className="wish-btn">
                <img data-tip="Add to Wishlist" src="/images/heart.png" />
                <span>Add to Wishlist</span>
            </div>
            <div className="comp-btn">
                <img data-tip="Add to Compare" src="/images/sliders.png" />
                <span>Add to Compare</span>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default ProductSpecs;
