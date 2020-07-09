import React, { Component } from "react";
import { Row, Col, Input, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import _ from "lodash";
import actions from "../../redux/actions";
import { openNotification } from "../../utils/common";
import Link from "next/link";

class ProductListView extends Component {
  state = {
    pdQty: 1,
    listItems: [],
  };

  componentDidMount() {
    this.props.data?.carts?.map((item, i) => {
      this.setState({
        ["pdQty" + i]: item.quantity,
      });
    });
    this.setState({
      listItems: this.props.data,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data && this.props.data.carts) {
      this.props.data.carts.map((item, i) => {
        this.setState({
          ["pdQty" + i]: item.quantity,
        });
      });
      this.setState({
        listItems: this.props.data,
      });
    }

    if (
      this.props.cart.removeFromCartResp !==
        prevProps.cart.removeFromCartResp &&
      this.props.cart.removeFromCartResp
    ) {
      openNotification("Success", "Removed from cart successfully");
      this.props.getCartProducts("page=1");
    }

    if (
      this.props.cart.editCartQtyResp !== prevProps.cart.editCartQtyResp &&
      this.props.cart.editCartQtyResp
    ) {
      // openNotification("Success", "Removed from cart successfully");
      // this.props.getCartProducts("page=1");
    }
  }

  changePdValue = (num, i, cartId) => {
    let newPdQty = parseInt(this.state["pdQty" + i]) + num;
    if (newPdQty >= 1) {
      this.setState({
        ["pdQty" + i]: newPdQty,
      });
    }
    this.props.editCartQty(cartId + "?quantity=" + newPdQty);
  };

  render() {
    console.log(this.state.listItems);
    return (
      <>
        {!_.isEmpty(this.state.listItems.carts)
          ? this.state.listItems.carts.map((items, i) => {
              return (
                <>
                  {!items.isDeleted && (
                    <div className="product-list-view">
                      <Row>
                        <Col lg={6} xs={24} key={i}>
                          <Link
                            href="/products/[slug]"
                            as={`/products/${items.product.slug}`}
                          >
                            <a>
                              <div className="pd-img">
                                <img
                                  src={
                                    process.env.IMAGE_BASE_URL +
                                    "/" +
                                    items.product?.images[0]?.medium
                                  }
                                  alt="helmet"
                                />
                              </div>
                            </a>
                          </Link>
                        </Col>
                        <Col lg={18} xs={24}>
                          <div className="pd-details">
                            <div className="name-price">
                              <div className="name">
                                <Link
                                  href="/products/[slug]"
                                  as={`/products/${items.product.slug}`}
                                >
                                  <a>
                                    <div className="pd-name">
                                      {items.product.name}
                                    </div>
                                  </a>
                                </Link>
                                <div className="sold-by">
                                  Sold By: {items.product?.soldBy.shopName}
                                </div>
                              </div>
                              <div className="price">
                                {items.product?.discountRate === 0 ? (
                                  <div className="new-price">
                                    {" "}
                                    Rs {items.product?.price}
                                  </div>
                                ) : (
                                  <>
                                    <div className="new-price">
                                      <span className="old-price">
                                        Rs {items.product?.price}
                                      </span>
                                      Rs{" "}
                                      {items.product?.price -
                                        (items.product?.price *
                                          items.product?.discountRate) /
                                          100}{" "}
                                    </div>
                                    <div className="price-disc">
                                      <span className="disc">
                                        {items.product?.discountRate}% OFF
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="qty">
                              <span className="qty-title">Qty:</span>
                              <span className="qty-inc-dcs">
                                <i
                                  aria-hidden="true"
                                  onClick={() =>
                                    this.changePdValue(-1, i, items._id)
                                  }
                                  className={
                                    "fa fa-minus " +
                                    (this.state.pdQty === 1 ? "disabled" : "")
                                  }
                                />
                                <Input
                                  defaultValue={this.state.pdQty}
                                  value={this.state["pdQty" + i]}
                                  onChange={(e) => {
                                    this.setState({
                                      ["pdQty" + i]: e.target.value,
                                    });
                                  }}
                                />
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                  onClick={() =>
                                    this.changePdValue(1, i, items._id)
                                  }
                                />
                              </span>
                            </div>
                            <div className="delete-product">
                              <Popconfirm
                                title="Are you sure you want to remove this from cart?"
                                onConfirm={() =>
                                  this.props.removeCart(items._id)
                                }
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <a>
                                  <Button className="btn">
                                    <DeleteOutlined />
                                    <span className="txt">
                                      REMOVE FROM CART
                                    </span>
                                  </Button>
                                </a>
                              </Popconfirm>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </>
              );
            })
          : ""}
      </>
    );
  }
}

export default connect((state) => state, actions)(ProductListView);
