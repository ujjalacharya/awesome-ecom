import React, { Component } from "react";
import { Tooltip } from "antd";

//includes
import QuickViewModal from "./QuickViewModal";

class ProductCard extends Component {
  state = {
    showQuickView: false,
  };

  showModal = () => {
    console.log('hey')
    this.setState({
      showQuickView: true,
    });
  };

  handleCancel = e => {
    this.setState({
      showQuickView: false,
    });
  };

  render() {
    return (
      <div className="product-card">
        {this.state.showQuickView && (
          <QuickViewModal
            title="Quick View Product"
            visible={this.state.showQuickView}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
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
            <div className="image">
              <img src="/images/prod-bag.jpg" alt="prod-bag.jpg" />
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
