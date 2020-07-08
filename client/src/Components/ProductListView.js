import React, { Component } from "react";
import { Row, Col, Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

class ProductListView extends Component {
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
      <div className="product-list-view">
        <Row>
          <Col lg={6} xs={24}>
            <div className="pd-img">
              <img src="/images/helmet.jpg" alt="helmet" />
            </div>
          </Col>
          <Col lg={18} xs={24}>
            <div className="pd-details">
              <div className="name-price">
                <div className="name">
                  <div className="pd-name">
                    Studds D2 Matte Double Visor Full Helmet - Black/white/grey
                  </div>
                  <div className="sold-by">Sold By: STUDDS</div>
                </div>
                <div className="price">
                  <div className="new-price"><span className="old-price">$ 40</span>$ 20 </div>
                  <div className="price-disc">
                    <span className="disc">50% OFF</span>
                  </div>
                </div>
              </div>
              <div className="qty">
                <span className="qty-title">Qty:</span>
                <span className="qty-inc-dcs">
                  <i
                    aria-hidden="true"
                    onClick={() => this.changePdValue(-1)}
                    className={
                      "fa fa-minus " +
                      (this.state.pdQty === 1 ? "disabled" : "")
                    }
                  />
                  <Input
                    defaultValue={this.state.pdQty}
                    value={this.state.pdQty}
                    onChange={(e) => {
                        this.setState({
                            pdQty: e.target.value,
                          });
                    }}
                  />
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => this.changePdValue(1)}
                  />
                </span>
              </div>
              <div className="delete-product">
                <Button className="btn">
                  <DeleteOutlined />
                  <span className="txt">REMOVE FROM CART</span>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductListView;
