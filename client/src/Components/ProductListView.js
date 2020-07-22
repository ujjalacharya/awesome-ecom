import React, { Component } from "react";
import { Row, Col, Input, Button, Popconfirm, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import _ from "lodash";
import actions from "../../redux/actions";
import { openNotification, getDiscountedPrice } from "../../utils/common";
import Link from "next/link";

class ProductListView extends Component {
  state = {
    pdQty: 1,
    listItems: [],
    checkoutItems: [],
    noStockProducts: [],
    inStockProducts: [],
  };

  componentDidMount() {
    this.props.inStockProducts?.carts?.map((item, i) => {
      this.setState({
        ["pdQtyInStock" + i]: item.quantity,
      });
    });

    this.props.noStockProducts?.carts?.map((item, i) => {
      this.setState({
        ["pdQtyNoStock" + i]: item.quantity,
      });
    });

    this.setState({
      inStockProducts: this.props.inStockProducts,
      noStockProducts: this.props.noStockProducts
    })
  }

  componentDidUpdate(prevProps) {
    
    if (this.props.inStockProducts !== prevProps.inStockProducts && this.props.inStockProducts.carts) {
     this.props.inStockProducts?.carts?.map((item, i) => {
        this.setState({
          ["pdQtyInStock" + i]: item.quantity,
        });
      });
  
      this.setState({
        inStockProducts: this.props.inStockProducts,
      })
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
    
    let newPdQty = parseInt(this.state["pdQtyInStock" + i]) + num;
    if (newPdQty >= 1) {
      this.setState({
        ["pdQtyInStock" + i]: newPdQty,
      });
    }
    this.props.editCartQty(cartId + "?quantity=" + newPdQty);
  };

  onCheckItems = (e) => {
    let itemValue = e.target.value;

    let checkoutItems = this.state.checkoutItems;

    let newCheckoutItems = [];

    if (checkoutItems.length > 0) {
      let itemsInserted = false;
      checkoutItems.map((itemCheck) => {
        if (itemValue.product._id !== itemCheck.product._id) {
          newCheckoutItems.push(itemCheck);
        } else {
          itemsInserted = true;
        }
      });

      if (!itemsInserted) {
        newCheckoutItems.push(e.target.value);
      }
    } else {
      newCheckoutItems.push(e.target.value);
    }

    this.setState({
      checkoutItems: newCheckoutItems,
    });

    let p_slugs = newCheckoutItems.map((newItems) => {
      return newItems.product.slug;
    });

    this.props.getShippingCharge({ p_slugs });

    this.props.getCheckoutItems(newCheckoutItems);
  };

  render() {
    return (
      <>
        {this.state.inStockProducts?.carts?.map((items, i) => {
          return (
            <div className="product-list-view">
              <Row>
                <Col lg={2}>
                  <Checkbox
                    value={items}
                    onChange={this.onCheckItems}
                    className={this.props.showCheckbox}
                  ></Checkbox>
                </Col>
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
                <Col lg={16} xs={24}>
                  <div className="pd-details">
                    <div className="name-price">
                      <div className="name">
                        <Link
                          href="/products/[slug]"
                          as={`/products/${items.product.slug}`}
                        >
                          <a>
                            <div className="pd-name">{items.product.name}</div>
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
                            Rs {items.product?.price.$numberDecimal}
                          </div>
                        ) : (
                          <>
                            <div className="new-price">
                              <span className="old-price">
                                Rs {items.product?.price.$numberDecimal}
                              </span>
                              Rs{" "}
                              {items.product?.price.$numberDecimal -
                                (items.product?.price.$numberDecimal *
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
                          onClick={() => this.changePdValue(-1, i, items._id)}
                          className={
                            "fa fa-minus " +
                            (this.state['pdQtyInStock'+i] === 1 ? "disabled" : "")
                          }
                        />
                        <Input
                          type="number"
                          defaultValue={this.state.pdQty}
                          value={this.state["pdQtyInStock" + i]}
                          onChange={(e) => {
                            if (items.product.quantity <= e.target.value) {
                              openNotification(
                                "Alert",
                                "Maximum product quantity excceded"
                              );
                              this.setState({
                                ["pdQtyInStock" + i]: items.product.quantity,
                              });
                            } else {
                              this.setState({
                                ["pdQtyInStock" + i]: e.target.value,
                              });
                            }
                          }}
                        />
                        <i
                          className={
                            "fa fa-plus " +
                            (items.product.quantity <= this.state["pdQtyInStock" + i]
                              ? "disabled clickDisable"
                              : "")
                          }
                          aria-hidden="true"
                          onClick={() => this.changePdValue(1, i, items._id)}
                        />
                      </span>
                    </div>
                    {items.product.quantity <= 5 && (
                      <div className="available-stock">
                        Only {items.product.quantity} items available on stock
                      </div>
                    )}
                    <div className="delete-product">
                      <Popconfirm
                        title="Are you sure you want to remove this from cart?"
                        onConfirm={() => this.props.removeCart(items._id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>
                          <Button className="btn">
                            <DeleteOutlined />
                            <span className="txt">REMOVE FROM CART</span>
                          </Button>
                        </a>
                      </Popconfirm>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      </>
    );
  }
}

export default connect((state) => state, actions)(ProductListView);
