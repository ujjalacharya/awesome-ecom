import React, { Component } from "react";
import { Row, Col, Input, Button, Popconfirm, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import _ from "lodash";
import actions from "../../redux/actions";
import { openNotification, getDiscountedPrice } from "../../utils/common";
import Link from "next/link";
import { IMAGE_BASE_URL } from "../../utils/constants";

class ProductListView extends Component {
  state = {
    pdQty: 1,
    listItems: [],
    checkoutItems: [],
    noStockProducts: [],
    productsData: [],
    showQtySection: "",
  };

  componentDidMount() {
    this.props.productsData?.carts?.map((item, i) => {
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
      productsData: this.props.productsData,
      showQtySection: this.props.showQtySection,
    });

    if (this.props.showCheckbox === 'noCheckbox') {

      let p_slugs = this.props.cart.checkoutItems?.carts.map((newItems) => {
        return newItems.product.slug;
      });

      this.props.getShippingCharge({ p_slugs });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.productsData !== prevProps.productsData &&
      this.props.productsData.carts
    ) {
      this.props.productsData?.carts?.map((item, i) => {
        this.setState({
          ["pdQtyInStock" + i]: item.quantity,
        });
      });

      this.setState({
        productsData: this.props.productsData,
        showQtySection: this.props.showQtySection,
      });
    }

    if (
      this.props.cart.removeFromCartResp !==
      prevProps.cart.removeFromCartResp &&
      this.props.cart.removeFromCartResp
    ) {
      this.props.getCartProducts("page=1");
    }

    // if (
    //   this.props.cart.editCartQtyResp !== prevProps.cart.editCartQtyResp &&
    //   this.props.cart.editCartQtyResp
    // ) {
    //   this.props.getCartProducts("page=1");
    // }
  }

  changePdValue = (num, i, cartId) => {
    let newPdQty = parseInt(this.state["pdQtyInStock" + i]) + num;
    if (newPdQty >= 1) {
      this.setState({
        ["pdQtyInStock" + i]: newPdQty,
      });
    }
    this.props.editCartQty(cartId + "?quantity=" + newPdQty);

    let newCheckoutItems = this.state.checkoutItems.map(obj => {
      let ele = {}
      if (obj._id === cartId) {
        return ele = { ...obj, quantity: newPdQty }
      } else {
        return obj
      }
    })
    this.setState({
      checkoutItems: newCheckoutItems
    })

    this.props.getCheckoutItems(newCheckoutItems);
  };

  changeInputPdQty = (e, i, items) => {
    let newPdQty = e.target.value;
    let cartId = items._id;
    if (items.product.quantity <= e.target.value) {
      openNotification(
        "Alert",
        "Maximum product quantity excceded"
      );
      newPdQty = items.product.quantity
    }

    if (e.target.value <= 0 && e.target.value !== '') {
      openNotification(
        "Alert",
        "Quantity cannot be zero"
      );
      newPdQty = 1;
    }

    this.setState({
      ["pdQtyInStock" + i]: newPdQty,
    });

    this.props.editCartQty(cartId + "?quantity=" + newPdQty);

    let newCheckoutItems = this.state.checkoutItems.map(obj => {
      let ele = {}
      if (obj._id === cartId) {
        return ele = { ...obj, quantity: newPdQty }
      } else {
        return obj
      }
    })
    this.setState({
      checkoutItems: newCheckoutItems
    })

    this.props.getCheckoutItems(newCheckoutItems);
    // else {
    //   // this.setState({
    //   //   ["pdQtyInStock" + i]: e.target.value,
    //   // });
    // }
  }

  onCheckItems = (item, i) => {
    let itemValue = { ...item, quantity: this.state["pdQtyInStock" + i] };
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
        newCheckoutItems.push(itemValue);
      }
    } else {
      newCheckoutItems.push(itemValue);
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
        {this.state.productsData?.carts?.map((items, i) => {
          return (
            <div className="product-list-view" key={i}>
              <Row>
                <Col lg={2}>
                  <Checkbox
                    // value={items}
                    onChange={() => this.onCheckItems(items, i)}
                    className={this.props.showCheckboxForOutOfStock || this.props.showCheckbox}
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
                            IMAGE_BASE_URL +
                            "/" +
                            items.product?.images[0]?.medium
                          }
                          alt="helmet"
                        />
                        {this.props.showQtySection && (
                          <div className="not-available">
                            <span>NOT AVAILABLE</span>
                          </div>
                        )}
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
                    <div className={"qty " + this.state.showQtySection}>
                      <span className="qty-title">Qty:</span>
                      {
                        this.props.showCheckbox === 'noCheckbox' ?
                          this.state.productsData?.totalQty || items.quantity
                          : <span className="qty-inc-dcs">
                            <i
                              aria-hidden="true"
                              onClick={() => { this.state["pdQtyInStock" + i] > 1 && this.changePdValue(-1, i, items._id) }}
                              className={
                                "fa fa-minus " +
                                (this.state["pdQtyInStock" + i] <= 1
                                  ? "disabled"
                                  : "")
                              }
                            // disabled = {this.state["pdQtyInStock" + i] === 1}
                            />
                            <Input
                              type="number"
                              defaultValue={this.state.pdQty}
                              value={this.state["pdQtyInStock" + i]}
                              onChange={(e) => {
                                this.changeInputPdQty(e, i, items)
                              }}
                            />
                            <i
                              className={
                                "fa fa-plus " +
                                (items.product.quantity <=
                                  this.state["pdQtyInStock" + i]
                                  ? "disabled"
                                  : "")
                              }
                              aria-hidden="true"
                              onClick={() => {
                                items.product.quantity > this.state["pdQtyInStock" + i] && 
                                this.changePdValue(1, i, items._id)
                              }}
                            />
                          </span>}
                    </div>
                    {items.product.quantity <= 5 &&
                      !this.state.showQtySection && (
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
