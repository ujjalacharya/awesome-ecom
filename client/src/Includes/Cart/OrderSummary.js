import React, { Component } from "react";
import { Button, Input } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { getDiscountedPrice } from "../../../utils/common";
import Link from "next/link";
import { STORE_CHECKOUT_ITEMS } from "../../../redux/types";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { withRouter } from "next/router";

class OrderSummary extends Component {

  render() {
    
    let totalCheckoutItems = 0;
    this.props.checkoutItems?.map((items) => {
      totalCheckoutItems += getDiscountedPrice(
        items.product.price.$numberDecimal,
        items.product.discountRate
      );
    });

    let deliveryCharges = 0;

    return (
      <div className="order-shipping">
        <div className={"shipping-details " + this.props.showShippingAddress}>
          <div className="os-title">Shipping & Billing</div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <EnvironmentOutlined />
                <div className="name">
                  <div>Utsav Shrestha</div>
                  <div className="address">
                    New baneshwor test, <br />
                    Banepa City Area, Banepa, Bagmati
                  </div>
                </div>
              </div>
            </div>
            <div className="pr edit">EDIT</div>
          </div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <PhoneOutlined />
                <div className="name">9854214523</div>
              </div>
            </div>
            <div className="pr edit">EDIT</div>
          </div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <MailOutlined />
                <div className="name">utsavstha@gmail.com</div>
              </div>
            </div>
            <div className="pr edit">EDIT</div>
          </div>
        </div>
        <div className="order-summary">
          <div className="os-title">Order Summary</div>
          <div className="price-details">
            <div className="price-title">PRICE DETAILS</div>
            <div className="price-cover">
              <div className="ti-pr">
                <div className="ti">Cart Total</div>
                <div className="pr">Rs {totalCheckoutItems}</div>
              </div>
              <div className="ti-pr">
                <div className="ti">Cart Discount</div>
                <div className="pr">- 0</div>
              </div>
              {/* <div className="ti-pr">
                <div className="ti">Tax</div>
                <div className="pr">$4</div>
              </div> */}
              <div className="ti-pr">
                <div className="ti">Delivery Charges</div>
                <div className="pr">Rs {deliveryCharges}</div>
              </div>
            </div>
            {/* <div className="cupon-voucher">
              <Input placeholder="Enter Voucher Code" />
              <Button className="btn">APPLY</Button>
            </div> */}
            <div className="total-price">
              <div className="ti-pr">
                <div className="ti">Total</div>
                <div className="pr">
                  Rs {totalCheckoutItems + deliveryCharges}
                </div>
              </div>
            </div>
            <div className="order-procced">
              <Link href="/checkout">
                <a>
                  <Button
                    className={"btn " + this.props.diableOrderBtn}
                    disabled={
                      this.props.diableOrderBtn === "disableBtn" ? true : false
                    }
                  >
                    {this.props.orderTxt}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(OrderSummary));
