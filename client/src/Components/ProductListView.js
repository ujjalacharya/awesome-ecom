import React, { Component } from "react";
import { Row, Col, Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import _ from 'lodash'
import next from "next";

class ProductListView extends Component {
  state = {
    pdQty: 1,
    listItems: [],
  };

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(prevProps){
    if (this.props.data !== prevProps.data && this.props.data.carts) {
      this.props.data.carts.map((item,i) => {
        this.setState({
          ['pdQty'+i]: item.quantity
        })
      })
      this.setState({
        listItems: this.props.data,
      });
    }
  }

  changePdValue = (num,i) => {
    let newPdQty = parseInt(this.state.pdQty) + num;
    if (newPdQty >= 1) {
      this.setState({
        ['pdQty'+i]: newPdQty,
      });
    }
  };
  render() {
    console.log(this.state)
    return (
      <div className="product-list-view">
        {!_.isEmpty(this.state.listItems.carts)
          ? this.state.listItems.carts.map((items, i) => {
              return (
                <Row>
                  <Col lg={6} xs={24}>
                    <div className="pd-img">
                      <img src={'/images/helmet.jpg'} alt="helmet" />
                    </div>
                  </Col>
                  <Col lg={18} xs={24}>
                    <div className="pd-details">
                      <div className="name-price">
                        <div className="name">
                          <div className="pd-name">
                            {items.product.name}
                          </div>
                          <div className="sold-by">Sold By: STUDDS</div>
                        </div>
                        <div className="price">
                          <div className="new-price">
                            <span className="old-price">$ 40</span>$ 20{" "}
                          </div>
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
                            onClick={() => this.changePdValue(-1, i)}
                            className={
                              "fa fa-minus " +
                              (this.state.pdQty === 1 ? "disabled" : "")
                            }
                          />
                          <Input
                            defaultValue={this.state.pdQty}
                            value={this.state['pdQty'+i]}
                            onChange={(e) => {
                              this.setState({
                                pdQty: e.target.value,
                              });
                            }}
                          />
                          <i
                            className="fa fa-plus"
                            aria-hidden="true"
                            onClick={() => this.changePdValue(1, i)}
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
              );
            })
          : ""}
      </div>
    );
  }
}

export default ProductListView;
